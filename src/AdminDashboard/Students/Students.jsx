import React from 'react'
import ManageStudents from './ManageStudents'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import Sidebar from '../Common/Sidebar'
import Nav from '../Common/Nav'

const Students = () => {
  return (
    <div className='bg-gray-50'>
    <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
      <div className='flex-1 '>
        <ManageStudents/>
      </div>
    </div>
</div>
  )
}

export default Students