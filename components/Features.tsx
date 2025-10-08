import React from 'react'
import Image from 'next/image'
import con1 from '../public/con-1.svg'
import con2 from '../public/con-2.svg'
import con3 from '../public/con-3.svg'
import con1Mobile from '../public/con-1-mobile.svg'
import con2Mobile from '../public/con-2-mobile.svg'
import con3Mobile from '../public/con-3-mobile.svg'
import layoutDashboardIcon from '../public/layout-dashboard.svg'
import bellRingIcon from '../public/bell-ring.svg'
import calendarIcon from '../public/calendar-arrow-up.svg'
import chartLineIcon from '../public/chart-line.svg'


const Features = () => {
  return (
    <div className='flex flex-col items-center mt-24 pt-4 '>
        <h1 className='text-[40px] w-3/4 text-center md:text-5xl font-bold mb-8'><span className='text-[#929297]'>How</span> <span className='text-[#544DF2]'>Track3r</span> Brings You Peace Of Mind</h1>


        {/* mobile view */}
        <div className="flex flex-col items-center gap-3">
            <Image src={con1Mobile} alt='features-image-1' className='w-4/5' />
            <Image src={con2Mobile} alt='features-image-2' className='w-4/5' />
            <Image src={con3Mobile} alt='features-image-3' className='w-4/5' />
        </div>


        {/* desktop view */}
        <div className="cons hidden md:flex md:flex-row flex-wrap md:w-full md:pl-28">
            <Image src={con1} width={560} alt='features-image-1' className='mr-11' />
            <Image src={con2} width={696} alt='features-image-2' className='' />
            <Image src={con3} width={1300} alt='features-image-3' className='md:mt-10' />
        </div>

        {/* <div className='mt-32 text-center'>
            <h1 className='text-5xl font-bold w-[767px]'><span className='text-[#929297]'>Everything</span> You Need to Stay on <span className='text-[#544DF2]'>Top of Your Bills</span></h1>
            <div className='features-con'>
                <div className='feature-con flex items-center justify-between px-5  w-[300px] h-[80px] border border-[#EFEFEF78] rounded-[124px] shadow-xl bg-[#FFFFFF]'>
                    <Image src={layoutDashboardIcon} width={60} alt='dashboard-icon' />
                    <span className='text-[#8B97B4] text-[18px] mr-1'>All in One Dashboard</span>
                </div>
            </div>
        </div> */}
    </div>
  )
}

export default Features