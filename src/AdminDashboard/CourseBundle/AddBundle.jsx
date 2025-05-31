import React, { useState, useEffect, useCallback } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import envConfig from '../../utils/envConfig';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const AddBundle = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    courses: [],
    price: '',
    image: null,
    imageUrl: '',
    bundle_data: {
      duration: '',
      type: 'Online'
    },
    credits_applied: true
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [courseSearch, setCourseSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Cloudinary configuration
  const cloudName = 'dorn9cn2x'; // Replace with your actual cloud name
  const uploadPreset = 'aarambh'; // Replace with your actual upload preset

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploading(true);
      try {
        // Create form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('cloud_name', cloudName);

        // Upload to Cloudinary
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              console.log('Upload progress:', percentCompleted);
            },
          }
        );

        if (response.data && response.data.secure_url) {
          setForm(prev => ({ ...prev, imageUrl: response.data.secure_url }));
          setImagePreview(response.data.secure_url);
          toast.success('Image uploaded successfully!');
        } else {
          throw new Error('No secure URL received from Cloudinary');
        }
      } catch (error) {
        console.error('Upload error:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response:', error.response.data);
          toast.error(`Upload failed: ${error.response.data.error?.message || 'Unknown error'}`);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          toast.error('Upload failed: No response from server');
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
          toast.error(`Upload failed: ${error.message}`);
        }
      } finally {
        setUploading(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5242880, 
    multiple: false,
    onDropRejected: (rejectedFiles) => {
      const errors = rejectedFiles[0].errors;
      if (errors[0].code === 'file-too-large') {
        toast.error('File is too large. Maximum size is 5MB');
      } else if (errors[0].code === 'file-invalid-type') {
        toast.error('Invalid file type. Please upload an image file');
      } else {
        toast.error('Error uploading file');
      }
    }
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view courses');
          return;
        }

        const response = await fetch(`${envConfig.backendUrl}/courses/admin/get_course`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        if (response.ok && data.status) {
          setAvailableCourses(data.data);
        } else {
          toast.error(data.message || 'Failed to fetch courses');
        }
      } catch (error) {
        toast.error('Error fetching courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseSearch = (e) => {
    const value = e.target.value;
    setCourseSearch(value);
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = availableCourses.filter(
      (c) => !form.courses.includes(c.id) && c.title.toLowerCase().includes(value.toLowerCase())
    );
    console.log('Filtered courses:', filtered);
    setSearchResults(filtered);
  };

  const handleAddSearchedCourse = (course) => {
    console.log('Adding course:', course); 
    if (!course || !course.id) {
      toast.error('Invalid course selected');
      return;
    }
    setForm((prev) => ({
      ...prev,
      courses: [...prev.courses, course.id]
    }));
    setCourseSearch('');
    setSearchResults([]);
  };

  const handleCourseSelect = (id) => {
    console.log('Removing course ID:', id);
    setForm((prev) => ({
      ...prev,
      courses: prev.courses.includes(id)
        ? prev.courses.filter((cid) => cid !== id)
        : [...prev.courses, id]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, price, bundle_data, credits_applied, imageUrl, courses } = form;

    if (!title || !description || !price || !bundle_data.duration || courses.length === 0) {
      toast.error('Please fill all required fields');
      return;
    }

    // Validate course IDs
    const validCourses = courses.filter(cid => {
      const course = availableCourses.find(c => c.id === cid);
      if (!course) {
        toast.error(`Course ID ${cid} not found`);
        return false;
      }
      return true;
    });

    if (validCourses.length === 0) {
      toast.error('No valid courses selected');
      return;
    }

    try {
      // Prepare data in the exact format required
      const bundleData = {
        title: title,
        description: description,
        dundle_image: imageUrl || 'https://example.com/images/bundle.jpg',
        price: parseInt(price),
        bundle_data: {
          duration: bundle_data.duration,
          type: bundle_data.type
        },
        credits_applied: credits_applied,
        courses: validCourses.map(id => parseInt(id))
      };

      console.log('Sending bundle data:', bundleData);

      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add bundle');
        return;
      }

      const response = await fetch(`${envConfig.backendUrl}/courses/admin/create_bundle`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bundleData)
      });

      const data = await response.json();

      if (response.ok && data.status) {
        toast.success('Bundle added successfully!');
        setForm({
          title: '',
          description: '',
          courses: [],
          price: '',
          image: null,
          imageUrl: '',
          bundle_data: { duration: '', type: 'Online' },
          credits_applied: true
        });
        setImagePreview(null);
      } else {
        if (data.courses) {
          const courseErrors = data.courses.map(err => err.msg).join(', ');
          toast.error(`Course errors: ${courseErrors}`);
        } else {
          toast.error(data.message || 'Failed to add bundle');
        }
      }
    } catch (error) {
      toast.error('Something went wrong: ' + error.message);
    }
    navigate('/admin/dashboard/bundle/manage')
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mt-4">
        <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Add New Bundle</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Image Upload with Dropzone */}
          <div>
            <label className="block mb-1 font-medium">Bundle Image</label>
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors
                ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-[#bdbdbd] bg-gray-50'}`}
              style={{ minHeight: '120px' }}
            >
              <input {...getInputProps()} />
              {uploading ? (
                <div className="text-gray-500">Uploading...</div>
              ) : !imagePreview ? (
                <>
                  <span className="text-gray-400 text-4xl mb-2"><FaRegImage /></span>
                  <span className="text-gray-500">
                    {isDragActive
                      ? "Drop the image here"
                      : "Drag & drop an image here, or click to select"}
                  </span>
                </>
              ) : (
                <div className="relative group">
                  <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm(prev => ({ ...prev, imageUrl: '', image: null }));
                      setImagePreview(null);
                    }}
                    className="absolute top-1 right-1 text-red-500 bg-white rounded-full px-2 py-1"
                  >×</button>
                </div>
              )}
            </div>
          </div>

          <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
          <input type="text" value={form.bundle_data.duration} onChange={(e) => setForm((prev) => ({
            ...prev,
            bundle_data: { ...prev.bundle_data, duration: e.target.value }
          }))} placeholder="Duration (e.g. 3 months)" className="border p-2 rounded" required />
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Price ₹" className="border p-2 rounded" min="0" required />

          {/* Course Search */}
          <div>
            <input
              type="text"
              placeholder="Search courses..."
              value={courseSearch}
              onChange={handleCourseSearch}
              className="border p-2 rounded w-full"
            />
            {searchResults.length > 0 && (
              <div className="bg-white border rounded mt-1 max-h-40 overflow-y-auto">
                {searchResults.map(course => (
                  <div
                    key={course.id}
                    className="px-3 py-2 hover:bg-purple-100 cursor-pointer"
                    onClick={() => handleAddSearchedCourse(course)}
                  >
                    {course.title}
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2 flex flex-wrap gap-2">
              {form.courses.map((cid) => {
                const course = availableCourses.find(c => c.id === cid);
                return course ? (
                  <span key={cid} className="bg-purple-100 text-[#020A47] px-2 py-1 rounded text-sm flex items-center gap-1">
                    {course.title} 
                    <button type="button" onClick={() => handleCourseSelect(cid)} className="text-xs">×</button>
                  </span>
                ) : null;
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="credits_applied"
              checked={form.credits_applied}
              onChange={(e) => setForm(prev => ({ ...prev, credits_applied: e.target.checked }))}
            />
            <label htmlFor="credits_applied" className="font-medium">Credits Applicable</label>
          </div>

          <button
            type="submit"
            className="bg-[#020a47dc] hover:bg-[#020A47] text-white px-4 py-2 rounded mt-2 font-semibold"
          >
            Add Bundle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBundle;
