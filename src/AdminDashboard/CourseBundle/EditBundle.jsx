import React, { useState, useEffect } from 'react';
import { FaRegImage } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import envConfig from '../../utils/envConfig';
import { useParams } from 'react-router-dom';
import Nav from '../Common/Nav';
import Bannertemp from '../../components/AboutPage/Bannertemp';
import Sidebar from '../Common/Sidebar';

const EditBundle = () => {
  const { id } = useParams(); // Get bundle ID from URL params
  const [form, setForm] = useState({
    title: '',
    description: '',
    courses: [],
    price: '',
    image: null,
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

  // Fetch bundle data
  useEffect(() => {
    const fetchBundleData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view bundle');
          return;
        }

        const response = await fetch(`${envConfig.backendUrl}/courses/admin/get_bundles`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log('All bundles:', data); // Debug log
        console.log('Looking for bundle ID:', id); // Debug log

        if (response.ok && data.status) {
          // Find the specific bundle by ID
          const bundle = data.data.find(b => b.id === parseInt(id));
          console.log('Found bundle:', bundle); // Debug log

          if (bundle) {
            // Pre-fill the form with bundle data
            setForm({
              title: bundle.title || '',
              description: bundle.description || '',
              courses: Array.isArray(bundle.courses) ? bundle.courses.map(c => c.id) : [],
              price: bundle.price ? bundle.price.toString() : '',
              image: null,
              bundle_data: {
                duration: bundle.bundle_data?.duration || '',
                type: bundle.bundle_data?.type || 'Online'
              },
              credits_applied: bundle.credits_applied || true
            });

            // Set image preview if bundle has an image
            if (bundle.dundle_image) {
              setImagePreview(bundle.dundle_image);
            }
          } else {
            toast.error('Bundle not found');
          }
        } else {
          toast.error(data.message || 'Failed to fetch bundle');
        }
      } catch (error) {
        console.error('Error fetching bundle:', error);
        toast.error('Error fetching bundle data');
      }
    };

    if (id) {
      fetchBundleData();
    }
  }, [id]);

  // Fetch available courses
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
    console.log('Filtered courses:', filtered); // Debug log
    setSearchResults(filtered);
  };

  const handleAddSearchedCourse = (course) => {
    console.log('Adding course:', course); // Debug log
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
    console.log('Removing course ID:', id); // Debug log
    setForm((prev) => ({
      ...prev,
      courses: prev.courses.includes(id)
        ? prev.courses.filter((cid) => cid !== id)
        : [...prev.courses, id]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setForm((prev) => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, price, bundle_data, credits_applied, image, courses } = form;

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
      const bundleData = {
        title: title,
        description: description,
        price: parseInt(price),
        bundle_data: {
          duration: bundle_data.duration,
          type: bundle_data.type
        },
        credits_applied: credits_applied,
        courses: validCourses.map(id => parseInt(id))
      };

      // Only include image if it was changed
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = async () => {
          bundleData.dundle_image = reader.result;
          await updateBundle(bundleData);
        };
      } else {
        await updateBundle(bundleData);
      }
    } catch (error) {
      toast.error('Something went wrong: ' + error.message);
    }
  };

  const updateBundle = async (bundleData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to edit bundle');
        return;
      }

      const response = await fetch(`${envConfig.backendUrl}/courses/admin/update_bundle/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bundleData)
      });

      const data = await response.json();

      if (response.ok && data.status) {
        toast.success('Bundle updated successfully!');
      } else {
        if (data.courses) {
          const courseErrors = data.courses.map(err => err.msg).join(', ');
          toast.error(`Course errors: ${courseErrors}`);
        } else {
          toast.error(data.message || 'Failed to update bundle');
        }
      }
    } catch (error) {
      toast.error('Error updating bundle: ' + error.message);
    }
  };

  return (
    <div className=' bg-gray-50'>
    <Nav/>
    <Bannertemp value={"Dashboard"} />
    <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
      <div className='lg:w-72'>
        <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
      </div>
      <div className="w-full flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mt-4">
        <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Edit Bundle</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Bundle Image</label>
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#bdbdbd] rounded-lg p-4 bg-gray-50 cursor-pointer"
              onClick={() => document.getElementById('bundle-image-input').click()}
              style={{ minHeight: '120px' }}
            >
              <input
                id="bundle-image-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {!imagePreview ? (
                <>
                  <span className="text-gray-400 text-4xl mb-2"><FaRegImage /></span>
                  <span className="text-gray-500">Click to upload image</span>
                </>
              ) : (
                <div className="relative group">
                  <img src={imagePreview} alt="Preview" className="h-32 w-32 object-cover rounded" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); handleImageRemove(); }}
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
            Edit Bundle
          </button>
        </form>
      </div>
    </div>
    </div>
</div>
  );
};

export default EditBundle;
