import React from 'react'
import AboutPageContentManage from './AboutPageContentManage'

const AboutPageContent = () => {
  return (
    <div className='bg-gray-50'>
  
    <div className='flex flex-col lg:flex-row gap-6 p-4 lg:p-6'>
     
      <div className='flex-1 '>
        <AboutPageContentManage/>
      </div>
    </div>
</div>
  )
}

export default AboutPageContent