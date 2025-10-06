import React from 'react'
import Image from 'next/image'
import logo from '../public/logo.svg'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center py-2 bg-[#FFFFFF] px-3 rounded-[40px]'>
        <Image 
        src={logo}
        width={130}
        
        alt='logo'
        />

        <div className="nav-links hidden sm:block">
            <ul className='flex gap-11 text-[14px] tracking-widest'>
                <li>Home</li>
                <li>Features</li>
                <li>How it works</li>
                <li>Pricing</li>
            </ul>

        </div>
        <div className='login-links hidden sm:block tracking-wider'>
            <span>Login</span>
            <button className='bg-[#544DF2] text-white px-[30px] py-[12px] rounded-[49px] ml-4'>Get started</button>
        </div>
    </div>
  )
}

export default Navbar