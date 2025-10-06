import React from 'react'

const Hero = () => {
  return (
    <div className='hero-con text-center mt-20  m-auto'>
        <h1 className='text-[68px] font-bold'><span className='text-[#544DF2]'>Never Miss</span><br /> A Payment Again</h1>
        <p className='text-[#49494B] text-[20px] w-2/6 m-auto mt-3 tracking-wider '>Track and manage all your bills and subscriptions in one place with smart reminders.</p>
        <button className='bg-[#544DF2] text-white px-[30px] py-[12px] rounded-[49px] tracking-wide'>Start tracking now</button>
        <button className='bg-[#FFFFFF] text-[#544DF2] px-[30px] py-[12px] rounded-[49px] tracking-wide'>Watch demo</button>
    </div>
  )
}

export default Hero