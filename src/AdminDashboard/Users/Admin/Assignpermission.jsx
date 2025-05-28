import React from 'react';
import Nav from '../../Common/Nav';
import Bannertemp from '../../../components/AboutPage/Bannertemp';
import Sidebar from '../../Common/Sidebar';
import { useNavigate } from 'react-router-dom';

const AssignPermission = () => {
    const navigate = useNavigate();
  const features = [
    'Dashboard',
    'Category',
    'Course',
    'Bootcamp',
    'Enrollment',
    'Enroll History',
    'Admin Revenue',
    'Instructor Revenue',
    'Purchase History',
    'Instructor',
    'Admin',
    'Student',
    'Message',
    'Newsletter',
    'Newsletter subscriber',
    'Contact User',
    'Offline Payment',
    'Coupon',
    'Blog',
    'Pending Blog List',
    'Blog category',
    'Blog settings',
    'System Settings',
  ];

  return (
    <div className='bg-gray-50'>
    <Nav/>
    <Bannertemp value={"Dashboard"} />
    <div className='flex flex-col relative lg:flex-row gap-6 p-4 lg:p-6'>
      <div className='lg:w-72 '>
        <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
      </div>
      <div className='w-1/2 m-auto '>
      <div className="flex justify-between items-center mb-5 border-b pb-4 border-gray-200">
        <h2 className="text-xl font-semibold">Admin Permissions</h2>
        <button 
        onClick={()=>navigate(-1)}
        className="px-4 py-2 cursor-pointer border border-gray-300 rounded bg-[#020A47] text-white text-base">
          ← Back
        </button>
      </div>

      {/* Assign permission for and Note */}
      <div className="mb-5 p-4 border border-gray-300 rounded bg-white">
        <p className="mb-2">Assign permission for: Aston clack</p>
        <p className="text-sm text-gray-600">Note: You can toggle the switch for enabling or disabling a feature to access</p>
      </div>

      {/* Feature list */}
      <div className="border border-gray-300 rounded bg-white shadow-md">
        {/* Header row */}
        <div className="flex justify-between font-bold px-4 py-3 border-b border-gray-200 bg-gray-200">
          <div className="flex-1">Feature</div>
          <div className="w-8 text-center"></div>
        </div>

        {/* Feature items */}
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex justify-between items-center px-4 py-3 ${index === features.length - 1 ? '' : 'border-b border-gray-200'}`}
          >
            <div className="flex-1">{feature}</div>
            <input type="checkbox" className="w-4 h-4 cursor-pointer" />
          </div>
        ))}
      </div>
      </div>
    </div>
</div>
  );
};

export default AssignPermission;