import React from 'react'
import Nav from '../Common/Nav'
import Sidebar from '../Common/Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import Graph from './Graph'
import Withdrawal from './Withdrawal'
import Overview from './Overview'
import CourseBar from './CourseBar'

const Dashboard = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
        <div className='flex-1 space-y-6'>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <Overview/>
          </div>
          <div className='bg-white rounded-xl shadow-sm p-6'>
            <Graph/>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <CourseBar/>
            </div>
            <div className='bg-white rounded-xl shadow-sm p-6'>
              <Withdrawal/>
            </div>
          </div>
    
      </div>
      </div>
    </div>
  )
}

export default Dashboard