import React from 'react'
import PricingCard from './PricingCard'
import FAQs from './FAQs'

const Pricing = () => {
  return (
    <div className='flex flex-col items-center px-3 py-20 mt-30 bg-[#EFEFF1] overflow-hidden' id='pricing'>
        <h1 className='text-[26px]/10 text-center text-[#929297] m-auto md:text-5xl/10 font-bold'>Simple Transparent Pricing</h1>
        <span className='text-[#939393] mt-5'>Choose the plan that fits your needs</span>
        <PricingCard />
        
    </div>
  )
}

export default Pricing