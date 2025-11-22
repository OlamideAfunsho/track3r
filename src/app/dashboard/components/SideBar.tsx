import React from 'react'
import logo from '../../../../public/logo.svg';
import searchIcon from '../../../../public/search-icon.svg'
import helpIcon from '../../../../public/dashboard-navlinks-icon-7.svg'
import settingsIcon from '../../../../public/dashboard-navlinks-icon-8.svg'
import logOUtIcon from '../../../../public/dashboard-navlinks-icon-9.svg'

import Image from 'next/image';
import Link from 'next/link';
import NavLinks from './NavLinks';

const SideBar = () => {
  return (
    <div className='flex flex-col h-full bg-[#FFFFFF] py-3'>
        <Link href='/'><Image src={logo} alt='track3r-logo' className='pl-3 w-38' /></Link>

        <div className='flex items-center gap-2 bg-[#FCFCFC] border-[#E0E0E0] border rounded-[3px] my-4 mx-3 h-10 p-2'>
          <Image src={searchIcon} alt='search-icon' className='w-auto h-4' />
          <input
         className="placeholder-[#999DA7] text-[12px] outline-none w-full"
         type="text" 
         placeholder='Search bills, subscriptions...'
         
         />
        </div>
        

        <div className="flex grow flex-row justify-between ml-3 mr-3 sm:ml-0 sm:mr-3  md:flex-col md:space-x-0 md:space-y-1">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
        <form className='hidden md:block'>
          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-medium hover:bg-[#E9E8FF] text-[#8B97B4] hover:text-[#544DF2] md:flex-none md:justify-start md:p-2 md:px-3">
            <Image src={helpIcon} width={24} alt='help-icon' />
            <div className="hidden md:block">Help</div>
          </button>

          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-medium hover:bg-[#E9E8FF] text-[#8B97B4] hover:text-[#544DF2] md:flex-none md:justify-start md:p-2 md:px-3">
            <Image src={settingsIcon} width={24} alt='settings-icon' />
            <div className="hidden md:block">Settings</div>
          </button>

          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-[12px] font-medium hover:bg-[#E9E8FF] text-[#8B97B4] hover:text-[#544DF2] md:flex-none md:justify-start md:p-2 md:px-3">
            <Image src={logOUtIcon} width={24} alt='logout-icon' />
            <div className="hidden md:block">Log Out</div>
          </button>
        </form>
      </div>
    </div>
  )
}

export default SideBar