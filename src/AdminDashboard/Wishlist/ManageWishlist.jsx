import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy data
const initialWishlists = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '34463434634',
    wishlistCourses: [
      { id: 1, name: 'Web Development Bootcamp' },
      { id: 2, name: 'Data Science Fundamentals' },
      { id: 3, name: 'UI/UX Design Masterclass' }
    ]
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567890',
    wishlistCourses: [
      { id: 4, name: 'Python Programming' },
      { id: 5, name: 'Machine Learning Basics' }
    ]
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '9876543210',
    wishlistCourses: [
      { id: 6, name: 'Full Stack Development' },
      { id: 7, name: 'Cloud Computing' },
      { id: 8, name: 'DevOps Essentials' }
    ]
  }
];

const itemsPerPage = 10;

const ManageWishlist = () => {
  const [wishlists, setWishlists] = useState(initialWishlists);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredCourses, setHoveredCourses] = useState(null);
  const navigate = useNavigate();

  // Filtered wishlists
  const filtered = wishlists.filter(w =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.email.toLowerCase().includes(search.toLowerCase()) ||
    w.phone.includes(search) ||
    w.wishlistCourses.some(course => 
      course.name.toLowerCase().includes(search.toLowerCase())
    )
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Wishlists</h1>
      </div>

      {/* Table Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
        <div className="w-full sm:w-auto flex gap-4">
          <input
            type="text"
            placeholder="Search by Name, Email, Phone or Course"
            value={search}
            onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          />
          <button className="px-4 py-2 bg-[#020A47] text-white rounded-lg">Search</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Wishlist Courses</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">No wishlists found.</td>
              </tr>
            )}
            {currentItems.map((w, idx) => (
              <tr key={w.id} className="border-t">
                <td className="px-4 py-3">{indexOfFirstItem + idx + 1}</td>
                <td className="px-4 py-3 font-medium">{w.name}</td>
                <td className="px-4 py-3">{w.email}</td>
                <td className="px-4 py-3">{w.phone}</td>
                <td className="px-4 py-3">
                  <div 
                    className="relative"
                    onMouseEnter={() => setHoveredCourses(w.id)}
                    onMouseLeave={() => setHoveredCourses(null)}
                  >
                    <span className="text-gray-700 cursor-pointer">
                      {w.wishlistCourses.length} Courses
                    </span>
                    {hoveredCourses === w.id && (
                      <div className="absolute left-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg z-50 border p-2">
                        <h4 className="font-semibold mb-2">Wishlist Courses:</h4>
                        <ul className="space-y-1">
                          {w.wishlistCourses.map(course => (
                            <li key={course.id} className="text-sm text-gray-600">
                              • {course.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-gray-600">
          Showing {filtered.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filtered.length)} of {filtered.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            Previous
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${currentPage === number
                ? 'bg-[#020A47] text-white'
                : 'bg-gray-100 hover:bg-gray-200'
                }`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 rounded ${currentPage === totalPages || totalPages === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageWishlist;
