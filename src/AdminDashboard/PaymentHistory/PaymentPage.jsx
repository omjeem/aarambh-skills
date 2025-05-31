import React from 'react'
import Nav from '../Common/Nav'
import Sidebar from '../Common/Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'

import PaymentHistory from './PaymentHistory'


const PaymentPage  = () => {
  return (
    <div className='w-full bg-gray-50  h-full'>    
        <div className='lg:my-4 lg:flex lg:gap-4 '>
       <div className='flex flex-col gap-4  m-auto p-4 md:p-0 lg:p-4 shadow-lg hover:shadow-xl rounded-lg'>
        <PaymentHistory  />
    
       </div>
        </div>
    </div>
  )
}
export default PaymentPage 