import React, { useState } from 'react';

const courseOptions = [
  'Active Listening: You Can Be a Great Listener',
  'The Future of Energy',
  'New Update Features',
  'New In-App Live System',
  'New Learning Page',
  'Travel Management Course',
  'Learn Linux in 5 Days',
  'Health And Fitness Masterclass',
  'How to Travel Around the World',
  'Learn and Understand AngularJS',
  'Excel from Beginner to Advanced',
  'How to Manage Your Virtual Team',
  'Become a Product Manager',
  'Web Design for Beginners',
];
const initialManuallyAdded = [
  {
    course: 'Active Listening: You Can Be a Great Listener',
    type: 'Course',
    price: '₹40',
    instructor: 'Affogato Media',
    date: '5 Jun 2025 | 01:07',
  },
];
const initialManuallyRemoved = [
  {
    course: 'The Future of Energy',
    type: 'Course',
    price: '₹60',
    instructor: 'Kate Williams',
    date: '',
  },
];
const initialPurchased = [
  { course: 'New Update Features', type: 'Course', price: '-', instructor: 'Kate Williams', date: '22 Jun 2022 | 00:37' },
  { course: 'New In-App Live System', type: 'Course', price: '₹10', instructor: 'Robert Ransdell', date: '1 Mar 2022 | 17:01' },
  { course: 'New Learning Page', type: 'Course', price: '-', instructor: 'Robert Ransdell', date: '1 Mar 2022 | 04:33' },
  { course: 'Travel Management Course', type: 'Course', price: '-', instructor: 'Light Moon', date: '28 Oct 2021 | 04:03' },
  { course: 'Learn Linux in 5 Days', type: 'Course', price: '-', instructor: 'Robert Ransdell', date: '12 Jul 2021 | 00:07' },
  { course: 'Health And Fitness Masterclass', type: 'Course', price: '₹20', instructor: 'Owosso', date: '11 Jul 2021 | 23:44' },
  { course: 'How to Travel Around the World', type: 'Course', price: '₹25', instructor: 'Light Moon', date: '11 Jul 2021 | 23:44' },
  { course: 'Learn and Understand AngularJS', type: 'Course', price: '₹20', instructor: 'James Kong', date: '11 Jul 2021 | 05:51' },
  { course: 'Excel from Beginner to Advanced', type: 'Course', price: '₹100', instructor: 'Robert Ransdell', date: '11 Jul 2021 | 05:49' },
  { course: 'How to Manage Your Virtual Team', type: 'Course', price: '₹50', instructor: 'Kate Williams', date: '11 Jul 2021 | 05:49' },
  { course: 'Become a Product Manager', type: 'Course', price: '-', instructor: 'Ricardo dave', date: '11 Jul 2021 | 05:48' },
  { course: 'Web Design for Beginners', type: 'Course', price: '₹10', instructor: 'King Pictures', date: '10 Jul 2021 | 17:39' },
];

export default function PurchasedCoursesTab() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [manuallyAdded, setManuallyAdded] = useState(initialManuallyAdded);
  const [manuallyRemoved, setManuallyRemoved] = useState(initialManuallyRemoved);
  const [purchased, setPurchased] = useState(initialPurchased);

  const handleAssignCourse = (e) => {
    e.preventDefault();
    if (!selectedCourse) return;
    setManuallyAdded([
      ...manuallyAdded,
      {
        course: selectedCourse,
        type: 'Course',
        price: '-',
        instructor: 'Unknown',
        date: new Date().toLocaleString(),
      },
    ]);
    setSelectedCourse('');
    alert('Course assigned!');
  };

  const handleRemove = (type, idx) => {
    if (type === 'added') {
      setManuallyAdded(manuallyAdded.filter((_, i) => i !== idx));
    } else if (type === 'removed') {
      setManuallyRemoved(manuallyRemoved.filter((_, i) => i !== idx));
    } else if (type === 'purchased') {
      setPurchased(purchased.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Assign a course */}
      <form className="flex flex-col gap-4" onSubmit={handleAssignCourse}>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Assign a course to the user</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="w-full md:w-1/2">
          <label className="block mb-1 font-medium">Course</label>
          <select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          >
            <option value="">Select a course</option>
            {courseOptions.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-start">
          <button type="submit" className=" bg-[#020A47] text-white px-6 py-2 rounded shadow font-semibold ">Save</button>
        </div>
      </form>
      {/* Manually Added Classes */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Manually Added Classes</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Added Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manuallyAdded.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2 text-[#6C63FF] cursor-pointer hover:underline">{row.course}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.instructor}</td>
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('added', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">
                      &#10006;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-gray-400 text-sm mt-2">List of contents that the student added to them manually.</div>
        </div>
      </div>
      {/* Manually Removed Classes */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Manually Removed Classes</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {manuallyRemoved.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2 text-[#6C63FF] cursor-pointer hover:underline">{row.course}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.instructor}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('removed', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">
                      &#10006;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-gray-400 text-sm mt-2">List of contents that the user purchased but the user's access removed by admin.</div>
        </div>
      </div>
      {/* Purchased */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-lg">Purchased</span>
          <div className="flex-1 border-b border-gray-200 ml-2"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Instructor</th>
                <th className="px-4 py-2">Purchase Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchased.map((row, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="px-4 py-2 text-[#6C63FF] cursor-pointer hover:underline">{row.course}</td>
                  <td className="px-4 py-2">{row.type}</td>
                  <td className="px-4 py-2">{row.price}</td>
                  <td className="px-4 py-2">{row.instructor}</td>
                  <td className="px-4 py-2">{row.date}</td>
                  <td className="px-4 py-2">
                    <button type="button" onClick={() => handleRemove('purchased', idx)} className="text-[#6C63FF] hover:text-red-600 text-lg">
                      &#10006;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 