import React, { useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


// Dummy data for bundles (replace with actual fetch later)
const dummyBundles = [
    { id: 1, name: 'All Bundles' },
    { id: 2, name: 'Beginner to Expert' },
    { id: 3, name: 'Complete Solution' },
    { id: 4, name: 'Complete study for Vue JS' },
    { id: 5, name: 'Complete Wordpress development' },
    { id: 6, name: 'Grow your creativity' },
    { id: 7, name: 'Web design and web development' },
];

const dummySubscribers = [
  { id: 1, name: 'Alice Smith', email: 'alice.s@example.com', status: 'Active', subscriptionDate: '2023-10-01', expiryDate: '2024-10-01', bundle: 'Beginner to Expert' },
  { id: 2, name: 'Bob Johnson', email: 'bob.j@example.com', status: 'Inactive', subscriptionDate: '2023-11-15', expiryDate: '2024-11-15', bundle: 'Complete Solution' },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', status: 'Active', subscriptionDate: '2024-01-20', expiryDate: '2025-01-20', bundle: 'Complete study for Vue JS' },
  { id: 4, name: 'Diana Prince', email: 'diana.p@example.com', status: 'Active', subscriptionDate: '2024-02-10', expiryDate: '2025-02-10', bundle: 'Beginner to Expert' },
  { id: 5, name: 'Ethan Hunt', email: 'ethan.h@example.com', status: 'Cancelled', subscriptionDate: '2023-12-05', expiryDate: '2024-12-05', bundle: 'Complete Wordpress development' },
  { id: 6, name: 'Fiona Glenanne', email: 'fiona.g@example.com', status: 'Active', subscriptionDate: '2024-03-01', expiryDate: '2025-03-01', bundle: 'Grow your creativity' },
  { id: 7, name: 'George Smiley', email: 'george.s@example.com', status: 'Active', subscriptionDate: '2024-03-15', expiryDate: '2025-03-15', bundle: 'Complete Solution' },
  { id: 8, name: 'Hannah Montana', email: 'hannah.m@example.com', status: 'Inactive', subscriptionDate: '2024-04-01', expiryDate: '2025-04-01', bundle: 'Web design and web development' },
  { id: 9, name: 'Ivan Drago', email: 'ivan.d@example.com', status: 'Active', subscriptionDate: '2024-04-10', expiryDate: '2025-04-10', bundle: 'Beginner to Expert' },
  { id: 10, name: 'Jane Doe', email: 'jane.d@example.com', status: 'Active', subscriptionDate: '2024-04-20', expiryDate: '2025-04-20', bundle: 'Complete study for Vue JS' },
  { id: 11, name: 'John Smith', email: 'john.s@example.com', status: 'Active', subscriptionDate: '2024-04-25', expiryDate: '2025-04-25', bundle: 'Grow your creativity' },
  { id: 12, name: 'Kelly Kapoor', email: 'kelly.k@example.com', status: 'Inactive', subscriptionDate: '2024-05-01', expiryDate: '2025-05-01', bundle: 'Web design and web development' },
];

const ManageSubscribers = () => {
  const [subscribers, setSubscribers] = useState(dummySubscribers);
  const [nameEmailSearch, setNameEmailSearch] = useState('');
  const [bundleFilter, setBundleFilter] = useState('All Bundles');
  const [dateFilter, setDateFilter] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredSubscribers = subscribers.filter(subscriber => {
    const nameEmailMatch = subscriber.name.toLowerCase().includes(nameEmailSearch.toLowerCase()) ||
                           subscriber.email.toLowerCase().includes(nameEmailSearch.toLowerCase());
    
    const bundleMatch = bundleFilter === 'All Bundles' || subscriber.bundle === bundleFilter;

    const dateMatch = !dateFilter ||
                      subscriber.subscriptionDate === dateFilter ||
                      subscriber.expiryDate === dateFilter;

    return nameEmailMatch && bundleMatch && dateMatch;
  });

  // Calculate currently displayed subscribers for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSubscribers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSubscribers.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNameEmailSearchChange = (e) => {
    setNameEmailSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleBundleFilterChange = (e) => {
    setBundleFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleOptionsClick = (id, e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  React.useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggleStatus = (id) => {
    setSubscribers(subscribers.map(s =>
      s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s
    ));
    setOpenMenuId(null);
  };

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/subscriber/edit/${id}`);
  };

  const handleDelete = (id) => {
    setSubscribers(subscribers.filter(s => s.id !== id));
    setOpenMenuId(null);
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-gray-50 w-full'>
      
        <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
        

         {/* Manage Subscribers section  */}
          <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2"><FiFilter /> Subscribers</h1>
     
      </div>
      <div className="flex flex-col sm:flex-row  items-center mb-4 gap-4">
      
        {/* Bundle Filter */}
        <select 
          value={bundleFilter}
          onChange={handleBundleFilterChange}
          className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
        >
          {dummyBundles.map(bundle => (
            <option key={bundle.id} value={bundle.name}>{bundle.name}</option>
          ))}
        </select>

        {/* Date Filter */}
        <input
          type="date"
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
        />

        {/* Name/Email Search */}
        <div className="w-full sm:w-auto flex gap-2">
          <input
            type="text"
            placeholder="Search name or email"
            value={nameEmailSearch}
            onChange={handleNameEmailSearchChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          /> 
          <button  className="px-4 py-2 bg-[#020A47] text-white rounded-lg">Search</button>

        </div>
      </div>
      <div className=" bg-white rounded-lg shadow drop-shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Bundle</th>
              <th className="px-4 py-3 text-left">Subscription Date</th>
              <th className="px-4 py-3 text-left">Expiry Date</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((subscriber, idx) => (
              <tr key={subscriber.id} className="border-t">
                <td className="px-4 py-3">{indexOfFirstItem + idx + 1}</td>
                <td className="px-4 py-3 font-medium">{subscriber.name}</td>
                <td className="px-4 py-3">{subscriber.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    subscriber.status === 'Active' ? 'bg-green-100 text-green-800' :
                    subscriber.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>{subscriber.status}</span>
                </td>
                <td className="px-4 py-3">{subscriber.bundle}</td>
                <td className="px-4 py-3">{subscriber.subscriptionDate}</td>
                <td className="px-4 py-3">{subscriber.expiryDate}</td>
                <td className="px-4 py-3 relative">
                  <div className="relative">
                    <button
                      onClick={e => handleOptionsClick(subscriber.id, e)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <BsThreeDotsVertical />
                    </button>
                    {openMenuId === subscriber.id && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg z-[99999] border">
                        <div className="py-1">
                          <button
                            onClick={() => handleToggleStatus(subscriber.id)}
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            {subscriber.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleEdit(subscriber.id)}
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(subscriber.id)}
                            className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left border-t"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     
      </div>
         {/* Pagination Controls */}
        {totalPages > 0 && (
          <div className="flex justify-between items-center mt-4 px-4">
            <div className="text-sm text-gray-600">
              Showing {filteredSubscribers.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredSubscribers.length)} of {filteredSubscribers.length} entries
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Previous
              </button>
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-3 py-1 rounded ${currentPage === number
                    ? 'bg-[#020A47] text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {number}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded ${currentPage === totalPages || totalPages === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
          </div>
          
        </div>
        
    </div>
  );
};

export default ManageSubscribers; 