import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Dashboard/Nav';
import Sidebar from '../Dashboard/Sidebar';
import Bannertemp from '../components/AboutPage/Bannertemp';

const DashboardLayout = () => {
  return (
    <div className='bg-gray-50'>
      <Nav />
      <Bannertemp value={"Dashboard"} />
      <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
        <Sidebar />
        <div className='flex-1'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 