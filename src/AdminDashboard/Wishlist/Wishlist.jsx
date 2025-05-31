import React from 'react'
import Bannertemp from '../../components/AboutPage/Bannertemp'
import Sidebar from '../Common/Sidebar'
import Nav from '../Common/Nav'
import ManageWishlist from './ManageWishlist'

const Wishlist = () => {
  return (
    <div className='bg-gray-50'>   
    <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
      <div className='flex-1 '>
        <ManageWishlist/>
      </div>
    </div>
</div>
  )
}

export default Wishlist