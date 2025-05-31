import React from 'react'
import ManageContact from './ManageContact'

const Contact = () => {
  return (
    <div className='bg-gray-50'>
    <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
      <div className='flex-1  '>
        <ManageContact/>
      </div>
    </div>
</div>
  )
}

export default Contact