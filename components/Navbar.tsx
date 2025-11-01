"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import logo from "../public/logo.svg";
import hamburgerMenu from "../public/hamburger-icon.svg";
import closeIcon from "../public/icons8-close.svg";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

   useEffect(() => {
  document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
}, [isMenuOpen]);

const handleNavClick = (id: string) => {
  const section = document.querySelector(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false); // Close menu after clicking
  }
};

  return (
    <div>
        {/* <div className={!isMenuOpen ? 'hidden' : 'block h-screen z-10 bg-[#FFFFFF]'}></div> */}
      <div className="flex justify-between items-center py-2 bg-[#FFFFFF] px-3 rounded-[40px]">
        <Link href='/'><Image src={logo} width={130} alt="logo" /></Link>

        {/* Mobile view */}
        <div>
          <Image
            src={hamburgerMenu}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            alt="hamburger-menu"
            className="md:hidden cursor-pointer"
          />
        </div>

        <AnimatePresence>
                  {isMenuOpen && (
        <motion.div
        initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        
        className={`fixed inset-0 z-50 bg-white/10 backdrop-blur-md bg-opacity-60 flex flex-col items-center space-y-8 text-[#544DF2] text-xl`}>
          <Image src={closeIcon} onClick={() => setIsMenuOpen(false)} width={24} alt="close-icon" className="self-end mr-11 mt-9 cursor-pointer" />
            <div className="flex flex-col items-center justify-center h-full gap-10">
              <Link href="#features" onClick={() => handleNavClick("#features")}>Features</Link>
          <Link href="#how-it-works" onClick={() => handleNavClick("#how-it-works")}>How it works</Link>
          <Link href="#pricing" onClick={() => handleNavClick("pricing")}>Pricing</Link>
            </div>
          
        </motion.div>
      )}
        </AnimatePresence>


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
