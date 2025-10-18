import React from 'react'
import Image from 'next/image'
import con1 from '../public/con-1.svg'
import con2 from '../public/con-2.svg'
import con3 from '../public/con-3.svg'
import con1Mobile from '../public/con-1-mobile.svg'
import con2Mobile from '../public/con-2-mobile.svg'
import con3Mobile from '../public/con-3-mobile.svg'
import FeaturesCon from './FeaturesCon'



const Features = () => {
  return (
    <div className='flex flex-col items-center mt-18 md:mt-24 pt-4 ' id='features'>
        <h1 className='text-3xl w-3/4 text-center md:text-5xl font-bold mb-8'><span className='text-[#929297]'>How</span> <span className='text-[#544DF2]'>Track3r</span> Brings You Peace Of Mind</h1>


        {/* mobile view */}
        <div className="flex flex-col items-center gap-3 md:hidden">
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

        <div className='mt-32 text-center'>
            <h1 className='text-3xl md:text-5xl font-bold w-2xs md:w-3xl' id="how-it-works"><span className='text-[#929297]'>Everything</span> You Need to Stay on <span className='text-[#544DF2]'>Top of Your Bills</span></h1>
            <FeaturesCon />
        </div>
    </div>
  )
}

export default Features