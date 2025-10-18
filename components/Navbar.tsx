"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/logo.svg";
import hamburgerMenu from "../public/hamburger-icon.svg";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
        {/* <div className={!isMenuOpen ? 'hidden' : 'block h-screen z-10 bg-[#FFFFFF]'}></div> */}
      <div className="flex justify-between items-center py-2 bg-[#FFFFFF] px-3 rounded-[40px]">
        <Image src={logo} width={130} alt="logo" />

        {/* Mobile view */}
        <div>
          <Image
            src={hamburgerMenu}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            alt="hamburger-menu"
            className="md:hidden cursor-pointer"
          />
        </div>

        {/* Desktop view */}
        <div className="nav-links hidden md:block">
          <ul className="flex gap-11 text-[14px] tracking-widest">
            <li className="text-[#544DF2]"><Link href='/'>Home</Link></li>
            <li><Link href='#features'>Features</Link></li>
            <li><Link href='#how-it-works'>How it works</Link></li>
            <li><Link href='#pricing'>Pricing</Link></li>
          </ul>
        </div>
        <div className="login-links hidden md:block tracking-wider">
          <span>Login</span>
          <button className="bg-[#544DF2] text-white px-[30px] py-[12px] rounded-[49px] ml-4">
            Get started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
