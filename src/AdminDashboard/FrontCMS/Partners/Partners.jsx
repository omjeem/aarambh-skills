import React from 'react'
import ManagePartners from './ManagePartners'

const Partners = () => {
  return (
    <div className='bg-gray-50'>
    <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
      <div className='flex-1  '>
        <ManagePartners/>
      </div>
    </div>
</div>
  )
}

export default Partners