import React, { useEffect, useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Nav from '../Common/Nav';
import Bannertemp from '../../components/AboutPage/Bannertemp';
import Sidebar from '../Common/Sidebar';
import apiService from '../../api';

// const dummyBundles = [
//   {
//     id: 1,
//     title: 'Beginner to Expert',
//     course_titles: ['Complete Guitar Lessons System', 'The Complete Python Bootcamp From Zero to Hero'],
//     subscriptionLimit: '365 Days',
//     price: '₹300',
//     status: 'active'
//   },
//   { id: 2, title: 'Complete Solution', course_titles: ['Scorm drawing course', 'Complete Blender Creator: Learn 3D Modelling', 'Basic to advanced sewing course for beginners'], subscriptionLimit: '500 Days', price: '₹500', status: 'active' },
//   { id: 3, title: 'Complete study for Vue JS', course_titles: ['Complete Guitar Lessons System', 'Build Websites from Scratch with HTML & CSS', 'Introduction and Learn bootstrap'], subscriptionLimit: '700 Days', price: '₹320', status: 'active' },
//   { id: 4, title: 'Complete wordpress development', course_titles: ['WordPress Theme Development with Bootstrap', 'Complete Guitar Lessons System'], subscriptionLimit: '365 Days', price: '₹400', status: 'active' },
//   { id: 5, title: 'Grow your creativity', course_titles: ['Complete Blender Creator: Learn 3D Modelling', 'Basic to advanced sewing course for beginners', 'How to Use Lighting Design to Transform your Home', 'The Complete Python Bootcamp From Zero to Hero'], subscriptionLimit: '600 Days', price: '₹375', status: 'active' },
//   { id: 6, title: 'Web design and web development', course_titles: ['Build Websites from Scratch with HTML & CSS', 'Introduction and Learn bootstrap'], subscriptionLimit: '600 Days', price: '₹300', status: 'active' },
//   // Add more dummy data for pagination if needed
// ];

const TableSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow drop-shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <th key={index} className="px-4 py-3">
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((rowIndex) => (
            <tr key={rowIndex} className="border-t">
              {[1, 2, 3, 4, 5, 6, 7].map((colIndex) => (
                <td key={colIndex} className="px-4 py-3">
                  {colIndex === 3 ? (
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageBundles = () => {
  const [bundles, setBundles] = useState([]);
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    (async () => {
      try {
        const response = await apiService.course.getALLBundles()
        if (response.status) {
          console.log("Response is ", response.data)
          setBundles(response.data)
        }
      } catch (error) {
        console.error("Error fetching bundles:", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const filteredBundles = bundles.filter(bundle =>
    bundle.title.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate currently displayed bundles for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBundles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBundles.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSearchClick = () => {
    // Search is already handled by handleSearchChange due to filteredBundles dependency
    // This button can trigger an API call if needed in the future
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

  const handleToggleStatus = async (id) => {
    const index = bundles.filter(bun => bun.id === id)
    if (index !== -1) {
      let status = bundles[index]
      if (status === "active") status = "inactive"
      else status = "active"
      console.log("Status is >>>>>>>>>>>> ", status)
      const response = await apiService.course.toggleBundleStatus(status, id)
      if (response.status) {
        setBundles(bundles.map(b =>
          b.id === id ? { ...b, status: b.status === 'active' ? 'inactive' : 'active' } : b
        ));
      }
    }
    setOpenMenuId(null);

  };

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/bundle/edit/${id}`);
  };

  const handleDelete = async (id) => {
    console.log("Delete id is ", id)
    const response = await apiService.course.deleteBundle(id)
    if (response.status) {
      setBundles(bundles.filter(b => b.id !== id));
      setOpenMenuId(null);
    }

  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-gray-50 w-full'>
     
      <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
      

        {/* Manage Bundles section  */}
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold flex items-center gap-2"><FiFilter /> Bundles</h1>
            <div className='flex gap-2'>
              <button
                onClick={() => navigate('/admin/dashboard/bundle/add')}
                className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg cursor-pointer">
                <GoPlus className='text-3xl lg:text-xl ' /> Add Bundle
              </button>
              <button
                onClick={() => navigate('/admin/dashboard/subscriber')}
                className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg cursor-pointer">
                subscription report
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">

            <div className="w-full sm:w-auto flex gap-2">
              <input
                type="text"
                placeholder="Search bundles"
                value={search}
                onChange={handleSearchChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
              />
              <button onClick={handleSearchClick} className="px-4 py-2 bg-[#020A47] text-white rounded-lg">Search</button>
            </div>
          </div>

          {loading ? (
            <TableSkeleton />
          ) : (
            <div className="bg-white rounded-lg shadow drop-shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Bundle</th>
                    <th className="px-4 py-3 text-left">Courses</th>
                    <th className="px-4 py-3 text-left">Subscription limit</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((bundle, idx) => (
                    <tr key={bundle.id} className="border-t">
                      <td className="px-4 py-3">{indexOfFirstItem + idx + 1}</td>
                      <td className="px-4 py-3 font-medium">{bundle.title}</td>
                      <td className="px-4 py-3">
                        <ul>
                          {bundle.course_titles.map((course, courseIdx) => (
                            <li key={courseIdx} className="list-disc list-inside">{course}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3">{bundle.subscriptionLimit || "365 Days"}</td>
                      <td className="px-4 py-3">{bundle.price}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-sm ${bundle.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{bundle.status}</span>
                      </td>
                      <td className="px-4 py-3 relative">
                        <div className="relative">
                          <button
                            onClick={e => handleOptionsClick(bundle.id, e)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <BsThreeDotsVertical />
                          </button>
                          {openMenuId === bundle.id && (
                            <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg z-[99999] border">
                              <div className="py-1">
                                <button
                                  onClick={() => handleToggleStatus(bundle.id)}
                                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                >
                                  {bundle.status === 'active' ? 'Inctivate' : 'Activate'}
                                </button>
                                <button
                                  onClick={() => handleEdit(bundle.id)}
                                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(bundle.id)}
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
          )}

          {/* Pagination Controls */}
          {totalPages > 0 && (
            <div className="flex justify-between items-center mt-4 px-4">
              <div className="text-sm text-gray-600">
                Showing {filteredBundles.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBundles.length)} of {filteredBundles.length} entries
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

export default ManageBundles; 