import React from 'react'
import Bannertemp from '../../../components/AboutPage/Bannertemp'
import ManageTable from "./ManageTable"
import Nav from '../../Common/Nav'
import Sidebar from '../../Common/Sidebar'


const ManageCourse = () => {
  return (
    <div className='bg-gray-50'>
      
        <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
        
          <div className='flex-1'>
            <ManageTable/>
          </div>
        </div>
    </div>
  )
}

export default ManageCourse