import React from 'react'
import PricingCard from './PricingCard'
import FAQs from './FAQs'

const Pricing = () => {
  return (
    <div className='flex flex-col items-center px-3 py-20 mt-30 bg-[#EFEFF1] overflow-hidden' id='pricing'>
        <h1 className='text-3xl text-center m-auto md:text-5xl font-bold'><span className='text-[#929297]'>Simple</span> Transparent <span className='text-[#544DF2]'>Pricing</span></h1>
        <span className='text-[#939393] mt-5'>Choose the plan that fits your needs</span>
        <PricingCard />
        
    </div>
  )
}

export default Pricing