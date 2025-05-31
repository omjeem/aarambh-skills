import React from 'react'
import ManagePageBanner from './ManagePageBanner'
import Bannertemp from '../../../components/AboutPage/Bannertemp'
import Sidebar from '../../Common/Sidebar'
import Nav from '../../Common/Nav'

const PageBanner = () => {
  return (
    <div className='bg-gray-50'>
    <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
      <div className='flex-1 '>
        <ManagePageBanner/>
      </div>
    </div>
</div>
  )
}

export default PageBanner