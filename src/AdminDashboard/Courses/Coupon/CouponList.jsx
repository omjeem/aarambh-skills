import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../Common/Nav';
import Bannertemp from '../../../components/AboutPage/Bannertemp';
import Sidebar from '../../Common/Sidebar';
import apiServices from "../../../api/index";

const CouponListSkeleton = () => {
  return (
    <div className='bg-gray-50'>
    
      <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
       
        <div className="p-6 w-full">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-40 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                {/* Table Header */}
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4">
                      <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="h-5 w-32 bg-gray-300 rounded animate-pulse"></div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="h-5 w-20 bg-gray-300 rounded animate-pulse"></div>
                    </th>
                    <th className="px-6 py-4">
                      <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                    </th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {/* Code Column */}
                      <td className="px-6 py-4">
                        <div className="h-6 w-32 bg-gray-300 rounded animate-pulse"></div>
                      </td>
                      {/* Discount Column */}
                      <td className="px-6 py-4">
                        <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                      </td>
                      {/* Expiry Date Column */}
                      <td className="px-6 py-4">
                        <div className="h-6 w-28 bg-gray-300 rounded animate-pulse"></div>
                      </td>
                      {/* Status Column */}
                      <td className="px-6 py-4">
                        <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                      </td>
                      {/* Actions Column */}
                      <td className="px-6 py-4">
                        <div className="flex gap-4">
                          <div className="h-6 w-12 bg-gray-300 rounded animate-pulse"></div>
                          <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CouponList = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await apiServices.course.getCoupenCodes();
        if (response?.data) {
          setCoupons(response.data);
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await apiServices.course.deleteCoupenCode(id);
      if (response?.data) {
        setCoupons(coupons.filter(coupon => coupon.id !== id));
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  if (loading) {
    return <CouponListSkeleton />;
  }

  return (
    <div className='bg-gray-50'>
   
      <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
       
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Coupons</h1>
            <button
              onClick={() => navigate('/admin/dashboard/coupon/add')}
              className="px-4 py-2 bg-[#020A47] text-white rounded-lg"
            >
              Add Coupon
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {coupons.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-500 text-lg">
                        No coupons available
                      </td>
                    </tr>
                  ) : (
                    coupons.map((coupon) => (
                      <tr key={coupon.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{coupon.coupon_code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{coupon.discount}%</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{coupon.expiry_date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            coupon.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {coupon.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex gap-2">
                            <button
                              onClick={() => navigate(`/admin/dashboard/coupon/edit/${coupon.id}`)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(coupon.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponList; 