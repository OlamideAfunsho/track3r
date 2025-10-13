'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import logo from '../public/logo.svg'
import hamburgerMenu from '../public/hamburger-icon.svg'

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <div className='flex justify-between items-center py-2 bg-[#FFFFFF] px-3 rounded-[40px]'>
        <Image 
        src={logo}
        width={130}
        
        alt='logo'
        />

        {/* Mobile view */}
        <div>
            <Image 
        src={hamburgerMenu}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        
        
        alt='hamburger-menu'
        className='md:hidden cursor-pointer'
        />


            {/* {!isMenuOpen && (
            <div className='block'>Hello</div>
        )} */}
        </div>
        
        

        {/* Desktop view */}
        <div className="nav-links hidden md:block">
            <ul className='flex gap-11 text-[14px] tracking-widest'>
                <li className='text-[#544DF2]'>Home</li>
                <li>Features</li>
                <li>How it works</li>
                <li>Pricing</li>
            </ul>

        </div>
        <div className='login-links hidden md:block tracking-wider'>
            <span>Login</span>
            <button className='bg-[#544DF2] text-white px-[30px] py-[12px] rounded-[49px] ml-4'>Get started</button>
        </div>

        
    </div>
  )
}

export default Navbar