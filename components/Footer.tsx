import React from 'react'
import logoFooter from '../public/logo-footer.svg'
import facebookLogo from '../public/facebook-logo.svg'
import instaLogo from '../public/insta-logo.svg'
import twitterLogo from '../public/twitter-logo.svg'
import Image from 'next/image'
import { dmSans } from '@/app/fonts'

const Footer = () => {
  return (
    <div className='bg-[#0D0D14] w-full h-auto md:h-[400px] px-10 md:px-20 py-15 overflow-hidden'>
    <div className=' flex flex-col gap-4 md:flex-row justify-between'>
        <div className='w-full md:w-1/5'>
            <Image src={logoFooter} alt='track3r-logo' className='mb-4 w-40 md:w-auto'/>
        <span className={`${dmSans.className} text-[#C8C8C8] `}>Track all your bills and subscriptions in one place with smart reminders.</span>

        </div>

            <div className="con-1 hidden md:flex flex-col gap-2">
                <h1 className='text-[#FFFFFF] text-[18px] font-semibold'>Products</h1>
                <span className='text-[#C8C8C8] text-[14px]'>Features</span>
                <span className='text-[#C8C8C8] text-[14px]'>How it works</span>
                <span className='text-[#C8C8C8] text-[14px]'>Testimonials</span>
                <span className='text-[#C8C8C8] text-[14px]'>Pricing</span>
                <span className='text-[#C8C8C8] text-[14px]'>Roadmap</span>
                <span className='text-[#C8C8C8] text-[14px]'>API</span>
            </div>
            <div className="con-2 hidden md:flex flex-col gap-2">
                <h1 className='text-[#FFFFFF] text-[18px] font-semibold'>Support</h1>
                <span className='text-[#C8C8C8] text-[14px]'>FAQs</span>
                <span className='text-[#C8C8C8] text-[14px]'>Community Forum</span>
                <span className='text-[#C8C8C8] text-[14px]'>Contact us</span>
                <span className='text-[#C8C8C8] text-[14px]'>System status</span>
                <span className='text-[#C8C8C8] text-[14px]'>Apps</span>
            </div>
            <div className="con-3 flex flex-col gap-2">
                <h1 className='text-[#FFFFFF] text-[18px] font-semibold'>Company</h1>
                <span className='text-[#C8C8C8] text-[14px]'>About us</span>
                <span className='text-[#C8C8C8] text-[14px]'>Our Blog</span>
                <span className='text-[#C8C8C8] text-[14px]'>Careers</span>
                <span className='text-[#C8C8C8] text-[14px]'>Security</span>
            </div>
            <div className="con-4 flex flex-col gap-2">
                <h1 className='text-[#FFFFFF] text-[18px] font-semibold'>Legal</h1>
                <span className='text-[#C8C8C8] text-[14px]'>Terms Of Service</span>
                <span className='text-[#C8C8C8] text-[14px]'>Company Policy</span>
                <span className='text-[#C8C8C8] text-[14px]'>Cookie Policy</span>
            </div>
    </div>

    <div className="flex justify-between mt-6">
         <span className='text-[#C8C8C8] text-[14px]'>&copy; 2025 Track3r, Inc. All rights reserved</span>
         <div className="flex gap-2.5">
            <Image src={facebookLogo} width={30} alt='facebook-logo' />
    <Image src={instaLogo} width={30} alt='instagram-logo' />
    <Image src={twitterLogo} width={25} alt='twitter-logo' />
         </div>
    </div>
   
    </div>
  )
}

export default Footer