import React from 'react'
import Nav from '../Common/Nav'
import Sidebar from '../Common/Sidebar'
import Bannertemp from '../../components/AboutPage/Bannertemp'

import Content from './Content'


const Payout = () => {
  return (
    <div className=''>   
        <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>      
          <div className='flex-1'>
            <Content/>
          </div>
        </div>
    </div>
  )
}
export default Payout