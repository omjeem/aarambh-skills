import React from 'react'
import Nav from '../../Common/Nav'
import Sidebar from '../../Common/Sidebar'
import Bannertemp from '../../../components/AboutPage/Bannertemp'
import Quiz from './Quiz'


const AddCourse = () => {
  return (
    <div className='bg-gray-50'>
      
        <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
         
          <div className='flex-1'>
            <Quiz/>
          </div>
        </div>
    </div>
  )
}

export default AddCourse