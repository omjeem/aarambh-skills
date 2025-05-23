import React, { useState } from 'react';
import { FaFileExport } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import { GoPlus } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Common/Nav';
import Bannertemp from '../../../components/AboutPage/Bannertemp';
import Sidebar from '../../Common/Sidebar';

const dummyCoupons = [
  { id: 1, code: 'VWGNGQETFP2', discount: 18, discountType: 'percent', expiry: '2024-04-07', status: 'Active' },
  { id: 2, code: 'AKGMRMFRU3', discount: 100, discountType: 'amount', expiry: '2024-05-10', status: 'Active' },
  { id: 3, code: 'XTLZROOQQD', discount: 96, discountType: 'percent', expiry: '2024-08-07', status: 'Active' },
  { id: 4, code: 'GOX6BZYZ0P', discount: 20, discountType: 'amount', expiry: '2024-07-16', status: 'Active' },
  { id: 5, code: 'L4E1EVDKDP', discount: 74, discountType: 'percent', expiry: '2024-09-10', status: 'Active' },
  { id: 6, code: 'HHJUINCTTX', discount: 99, discountType: 'amount', expiry: '2024-10-15', status: 'Inactive' },
  { id: 7, code: 'SDFTHSRDFASD', discount: 12, discountType: 'percent', expiry: '2024-04-27', status: 'Active' },
  // Add more dummy data for pagination
  { id: 8, code: 'COUPON008', discount: 25, discountType: 'percent', expiry: '2024-11-20', status: 'Active' },
  { id: 9, code: 'DEAL2024', discount: 50, discountType: 'amount', expiry: '2024-12-31', status: 'Active' },
  { id: 10, code: 'SAVE15', discount: 15, discountType: 'percent', expiry: '2024-06-30', status: 'Inactive' },
  { id: 11, code: 'GET100', discount: 100, discountType: 'amount', expiry: '2025-01-15', status: 'Active' },
  { id: 12, code: 'FLASH24', discount: 30, discountType: 'percent', expiry: '2024-05-05', status: 'Active' },
  { id: 13, code: 'BUDDY20', discount: 20, discountType: 'percent', expiry: '2024-07-25', status: 'Active' },
  { id: 14, code: 'FRESHIE', discount: 75, discountType: 'amount', expiry: '2024-08-10', status: 'Inactive' },
  { id: 15, code: 'SUMMER10', discount: 10, discountType: 'percent', expiry: '2024-09-01', status: 'Active' },
];

const ManageCoupon = () => {
  const [coupons, setCoupons] = useState(dummyCoupons);
  const [search, setSearch] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCoupons = coupons.filter(coupon =>
    coupon.code.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate currently displayed coupons for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoupons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCoupons.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSearchClick = () => {
    // Search is already handled by handleSearchChange due to filteredCoupons dependency
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

  const handleToggleStatus = (id) => {
    setCoupons(coupons.map(c =>
      c.id === id ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
    ));
    setOpenMenuId(null);
  };

  const handleEdit = (id) => {
    navigate(`/admin/dashboard/coupon/edit/${id}`);
  };

  const handleDelete = (id) => {
    setCoupons(coupons.filter(c => c.id !== id));
    setOpenMenuId(null);
  };

  // Handle pagination change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='bg-gray-50 w-full'>
        <Nav/>
        <Bannertemp value={"Dashboard"} />
        <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
          <div className='lg:w-72'>
            <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
          </div>

         {/* Manage section  */}
          <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2"><FiFilter /> Coupon</h1>
        <button
          onClick={() => navigate('/admin/dashboard/coupon/add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#020A47] text-white rounded-lg cursor-pointer">
          <GoPlus className='text-3xl lg:text-xl ' /> Add Coupon
        </button>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      
        <div className="w-full sm:w-auto flex gap-2">
          <input
            type="text"
            placeholder="Search coupon"
            value={search}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#020A47]"
          />
          <button onClick={handleSearchClick} className="px-4 py-2 bg-[#020A47] text-white rounded-lg">Search</button>
        </div>
      </div>
      <div className=" bg-white rounded-lg shadow drop-shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Coupon code</th>
              <th className="px-4 py-3 text-left">Discount</th>
              <th className="px-4 py-3 text-left">Expiry</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Options</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((coupon, idx) => (
              <tr key={coupon.id} className="border-t">
                <td className="px-4 py-3">{indexOfFirstItem + idx + 1}</td>
                <td className="px-4 py-3 font-medium">{coupon.code}</td>
                <td className="px-4 py-3">{coupon.discountType === 'percent' ? `${coupon.discount} %` : `₹ ${coupon.discount}`}</td>
                <td className="px-4 py-3">{new Date(coupon.expiry).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${coupon.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{coupon.status}</span>
                </td>
                <td className="px-4 py-3 relative">
                  <div className="relative">
                    <button
                      onClick={e => handleOptionsClick(coupon.id, e)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <BsThreeDotsVertical />
                    </button>
                    {openMenuId === coupon.id && (
                      <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg z-[99999] border">
                        <div className="py-1">
                          <button
                            onClick={() => handleToggleStatus(coupon.id)}
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            {coupon.status === 'Active' ? 'Inctivate' : 'Activate'}
                          </button>
                          <button
                            onClick={() => handleEdit(coupon.id)}
                            className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(coupon.id)}
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
              Showing {filteredCoupons.length === 0 ? 0 : indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredCoupons.length)} of {filteredCoupons.length} entries
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

export default ManageCoupon;
