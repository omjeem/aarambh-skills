import React from 'react'
import ManageStudents from './ManageStudents'
import Bannertemp from '../../../components/AboutPage/Bannertemp'
import Sidebar from '../../Common/Sidebar'
import Nav from '../../Common/Nav'

const Students = () => {
  return (
    <div className='bg-gray-50'>
    <Nav/>
    <Bannertemp value={"Dashboard"} />
    <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
      <div className='lg:w-72'>
        <Sidebar col={"bg-purple-100 hover:bg-purple-100 text-[#020A47] font-bold"}/>
      </div>
      <div className='flex-1 '>
        <ManageStudents/>
      </div>
    </div>
</div>
  )
}

export default Students