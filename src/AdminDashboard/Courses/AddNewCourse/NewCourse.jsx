import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { authToken } from '../../../utils/constants';
import axios from 'axios';
import envConfig from '../../../utils/envConfig';
import { useNavigate } from 'react-router-dom';

const NewCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    description: '',
    category: '',
    courseLevel: '',
    language: '',
    pricingType: 'paid',
    price: '',
    hasDiscount: false,
    discountedPrice: '',
    expiryPeriod: 'lifetime',
    dripContent: 'off',
    image_file: null,
    status: 'draft',
    people_enrolled: 0,
  });

  console.log(formData)

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    const fetchCatagories = async () => {
      try {
        const response = await axios.get(`${envConfig.backendUrl}/courses/admin/get_category`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        const responseData = response.data.data
        setCategories(responseData)
        console.log("Response is >>>> ", responseData)
      } catch (error) {
        console.log("Error while fetching categories", error)
      }
    }
    fetchCatagories()
  }, [])

 




  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDescriptionChange = (content) => {
    setFormData(prev => ({
      ...prev,
      description: content
    }));
  };

  const handleimage_fileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image_file: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);


    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'image_file' && formData[key]) {
          formDataToSend.append('image_file', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch(`${envConfig.backendUrl}/courses/admin/create_course`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formDataToSend
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create course');
      }

      // Handle success (e.g., redirect or show success message)
  
      navigate('/admin/dashboard/manageCourse')
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 sm:p-6 bg-white shadow-md rounded-md">
      <div className="flex items-center mb-4 sm:mb-6">
        <span className="text-lg sm:text-xl font-semibold text-[#020A47]">Add New Course</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Course Title"
                className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
                required
              />
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Short Description
              </label>
              <textarea
                name="short_description"
                value={formData.short_description}
                onChange={handleInputChange}
                placeholder="Enter Short Description"
                rows="3"
                className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
              />
            </div>

            {/* Description */}
            <div className="min-h-[300px] sm:min-h-[400px]">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Description
              </label>
              <div className="h-[250px] sm:h-[350px]">
                <ReactQuill
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  className="h-full"
                  theme="snow"
                />
              </div>
            </div>

            {/* Create as */}
            <div className="mt-12 sm:mt-16">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Create as <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['active', 'private', 'upcoming', 'pending', 'draft', 'inactive'].map((status) => (
                  <label key={status} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={formData.status === status}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Level */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Course level <span className="text-red-500">*</span>
              </label>
              <select
                name="courseLevel"
                value={formData.courseLevel}
                onChange={handleInputChange}
                className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
                required
              >
                <option value="">Select your course level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Made in <span className="text-red-500">*</span>
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
                required
              >
                <option value="">Select your course language</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
              </select>
            </div>

            {/* Pricing Type */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Pricing type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['paid', 'free'].map((type) => (
                  <label key={type} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="pricingType"
                      value={type}
                      checked={formData.pricingType === type}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            {formData.pricingType === 'paid' && (
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Enter your course price (₹)"
                  className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
                  required
                />
              </div>
            )}

            {/* Discount */}
            {formData.pricingType === 'paid' && (
              <div className="space-y-3">
                <label className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                  <input
                    type="checkbox"
                    name="hasDiscount"
                    checked={formData.hasDiscount}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  <span className="text-sm">Check if this course has discount</span>
                </label>
                {formData.hasDiscount && (
                  <input
                    type="number"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handleInputChange}
                    placeholder="Enter your discount price (₹)"
                    className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
                  />
                )}
              </div>
            )}

            {/* Expiry Period */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Expiry period
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['lifetime', 'limited'].map((period) => (
                  <label key={period} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="expiryPeriod"
                      value={period}
                      checked={formData.expiryPeriod === period}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{period === 'limited' ? 'Limited time' : period}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Drip Content */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Enable drip content <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {['off', 'on'].map((option) => (
                  <label key={option} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                    <input
                      type="radio"
                      name="dripContent"
                      value={option}
                      checked={formData.dripContent === option}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* image_file */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                image_file
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleimage_fileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 sm:pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-[#020A47] text-white px-6 py-3 rounded-lg hover:bg-[#020A47]/90 disabled:opacity-50 text-sm sm:text-base font-medium"
          >
            {loading ? 'Creating...' : 'Submit'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-center mt-4 text-sm sm:text-base">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default NewCourse;
