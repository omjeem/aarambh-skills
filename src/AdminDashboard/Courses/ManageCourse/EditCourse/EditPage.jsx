import React, { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ItemType = {
  CURRICULUM_ITEM: 'curriculumItem',
};

const DraggableItem = ({ item, index, moveItem, handleEdit, handleDelete }) => {
  const [, ref] = useDrag({
    type: ItemType.CURRICULUM_ITEM,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType.CURRICULUM_ITEM,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="bg-white rounded-lg shadow-md p-4 mb-2 flex justify-between items-center">
      <span>{item.type.toUpperCase()}: {item.title}</span>
      <div>
        <button
          onClick={() => handleEdit(index, { ...item, title: 'Edited Title' })}
          className="text-blue-500 hover:text-blue-700 mr-2"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(index)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const EditPage = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: 'Sample Course',
    shortDescription: 'This is a short description.',
    description: 'This is a sample course description.',
    category: '',
    courseLevel: '',
    language: '',
    pricingType: 'paid',
    price: '',
    hasDiscount: false,
    discountedPrice: '',
    expiryPeriod: 'lifetime',
    dripContent: 'off',
    thumbnail: null,
    status: 'draft',
  });

  const [curriculum, setCurriculum] = useState([
    { id: 'item-0', type: 'video', title: 'Introduction to Course' },
    { id: 'item-1', type: 'quiz', title: 'Quiz 1' },
    { id: 'item-2', type: 'project', title: 'Project 1' },
    { id: 'item-3', type: 'video', title: 'Advanced Topics' },
    { id: 'item-4', type: 'quiz', title: 'Final Quiz' },
    { id: 'item-5', type: 'project', title: 'Capstone Project' }
  ]);

  const handleCourseDetailChange = (field, value) => {
    setCourseDetails({ ...courseDetails, [field]: value });
  };

  const handleCurriculumEdit = (index, newValue) => {
    const newCurriculum = [...curriculum];
    newCurriculum[index] = newValue;
    setCurriculum(newCurriculum);
  };

  const handleCurriculumDelete = (index) => {
    const newCurriculum = [...curriculum];
    newCurriculum.splice(index, 1);
    setCurriculum(newCurriculum);
  };

  const moveItem = (fromIndex, toIndex) => {
    const updatedCurriculum = [...curriculum];
    const [movedItem] = updatedCurriculum.splice(fromIndex, 1);
    updatedCurriculum.splice(toIndex, 0, movedItem);
    setCurriculum(updatedCurriculum);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6  w-full lg:w-[80%] m-auto min-h-screen">
        <div className=" mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Edit Course</h1>
          <form className="space-y-4 sm:space-y-6">
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
                    value={courseDetails.title}
                    onChange={(e) => handleCourseDetailChange('title', e.target.value)}
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
                    name="shortDescription"
                    value={courseDetails.shortDescription}
                    onChange={(e) => handleCourseDetailChange('shortDescription', e.target.value)}
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
                      value={courseDetails.description}
                      onChange={(content) => handleCourseDetailChange('description', content)}
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
                          checked={courseDetails.status === status}
                          onChange={(e) => handleCourseDetailChange('status', e.target.value)}
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
                    value={courseDetails.category}
                    onChange={(e) => handleCourseDetailChange('category', e.target.value)}
                    className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
                    required
                  >
                    <option value="">Select a category</option>
                    {/* Add category options dynamically */}
                  </select>
                </div>

                {/* Course Level */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Course level <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="courseLevel"
                    value={courseDetails.courseLevel}
                    onChange={(e) => handleCourseDetailChange('courseLevel', e.target.value)}
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
                    value={courseDetails.language}
                    onChange={(e) => handleCourseDetailChange('language', e.target.value)}
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
                          checked={courseDetails.pricingType === type}
                          onChange={(e) => handleCourseDetailChange('pricingType', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm capitalize">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                {courseDetails.pricingType === 'paid' && (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Price (₹) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={courseDetails.price}
                      onChange={(e) => handleCourseDetailChange('price', e.target.value)}
                      placeholder="Enter your course price (₹)"
                      className="w-full p-2.5 sm:p-3 border rounded-lg focus:outline-none focus:border-[#020A47] text-sm sm:text-base"
                      required
                    />
                  </div>
                )}

                {/* Discount */}
                {courseDetails.pricingType === 'paid' && (
                  <div className="space-y-3">
                    <label className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        name="hasDiscount"
                        checked={courseDetails.hasDiscount}
                        onChange={(e) => handleCourseDetailChange('hasDiscount', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Check if this course has discount</span>
                    </label>
                    {courseDetails.hasDiscount && (
                      <input
                        type="number"
                        name="discountedPrice"
                        value={courseDetails.discountedPrice}
                        onChange={(e) => handleCourseDetailChange('discountedPrice', e.target.value)}
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
                          checked={courseDetails.expiryPeriod === period}
                          onChange={(e) => handleCourseDetailChange('expiryPeriod', e.target.value)}
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
                          checked={courseDetails.dripContent === option}
                          onChange={(e) => handleCourseDetailChange('dripContent', e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm capitalize">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Thumbnail */}
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Thumbnail
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
                        onChange={(e) => handleCourseDetailChange('thumbnail', e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

          

          <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
          <div className="mb-6">
            {curriculum.map((item, index) => (
              <DraggableItem
                key={item.id}
                item={item}
                index={index}
                moveItem={moveItem}
                handleEdit={handleCurriculumEdit}
                handleDelete={handleCurriculumDelete}
              />
            ))}
          </div>
            {/* Submit Button */}
            <div className="flex justify-end pt-4 sm:pt-6">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#020A47] text-white px-6 py-3 rounded-lg hover:bg-[#020A47]/90 text-sm sm:text-base font-medium"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </DndProvider>
  );
};

export default EditPage;
