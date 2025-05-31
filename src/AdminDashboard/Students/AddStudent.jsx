import React, { useState } from 'react';
import Nav from '../Common/Nav';
import Sidebar from '../Common/Sidebar';
import Bannertemp from '../../components/AboutPage/Bannertemp';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Large dummy courses list
const coursesList = [
  { id: 1, title: 'DSA' },
  { id: 2, title: 'Data Science' },
  { id: 3, title: 'Python' },
  { id: 4, title: 'JavaScript' },
  { id: 5, title: 'Java' },
  { id: 6, title: 'React' },
  { id: 7, title: 'Node.js' },
  { id: 8, title: 'C++' },
  { id: 9, title: 'Machine Learning' },
  { id: 10, title: 'Cloud Computing' },
  { id: 11, title: 'Cyber Security' },
  { id: 12, title: 'Blockchain' },
];

const AddStudent = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    courses: [],
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [courseSearch, setCourseSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseSelect = (id) => {
    setForm((prev) => ({
      ...prev,
      courses: prev.courses.includes(id)
        ? prev.courses.filter((cid) => cid !== id)
        : [...prev.courses, id],
    }));
  };

  const handleCourseSearch = (e) => {
    const value = e.target.value;
    setCourseSearch(value);
    if (value.trim() === '') {
      setSearchResults([]);
      return;
    }
    // Exclude already selected and already shown (first 5)
    const shownIds = coursesList.slice(0, 5).map(c => c.id);
    const filtered = coursesList.filter(
      c =>
        !form.courses.includes(c.id) &&
        !shownIds.includes(c.id) &&
        c.title.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleAddSearchedCourse = (course) => {
    setForm((prev) => ({ ...prev, courses: [...prev.courses, course.id] }));
    setCourseSearch('');
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // API call yahan karein
    console.log('Student Data:', form);
  };

  return (
    <div className='bg-gray-50'>
    
      <div className="flex flex-col lg:flex-row gap-4 p-4">
      
        <div className="flex-1 flex justify-center items-start">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg mt-4">
            <h2 className="text-2xl font-bold mb-6 text-[#020A47]">Add New Student</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder='Enter Student Name'
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder='Enter Student Email'
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder='Enter Student Phone Number'
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                    required
                  />
                
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Enroll in Courses</label>
             
                <input
                  type="text"
                  placeholder="Search and add more courses..."
                  value={courseSearch}
                  onChange={handleCourseSearch}
                  className="w-full border rounded px-3 py-2 mb-1 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
                />
                {searchResults.length > 0 && (
                  <div className="bg-white border rounded shadow mt-1 max-h-40 overflow-y-auto z-50 relative">
                    {searchResults.map((course) => (
                      <div
                        key={course.id}
                        className="px-3 py-2 hover:bg-purple-50 cursor-pointer"
                        onClick={() => handleAddSearchedCourse(course)}
                      >
                        {course.title}
                      </div>
                    ))}
                  </div>
                )}
                {/* Show selected courses not in first 5 */}
                {form.courses.filter(cid => !coursesList.slice(0, 5).map(c => c.id).includes(cid)).length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {form.courses.filter(cid => !coursesList.slice(0, 5).map(c => c.id).includes(cid)).map(cid => {
                      const course = coursesList.find(c => c.id === cid);
                      return course ? (
                        <span key={cid} className="bg-purple-100 text-[#020A47] px-2 py-1 rounded text-sm flex items-center gap-1">
                          {course.title}
                          <button type="button" onClick={() => handleCourseSelect(cid)} className="ml-1 text-xs">×</button>
                        </span>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#020A47]  text-white px-4 py-2 rounded  mt-2 font-semibold"
                disabled={!form.name || !form.email || !form.phone || !form.password}
              >
                Add Student
              </button>
              {submitted && (
                <div className="text-green-600 font-medium mt-2 w-full flex justify-center items-center ">Student added successfully</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
