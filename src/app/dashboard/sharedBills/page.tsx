"use client"

import { motion } from 'framer-motion'
import React from 'react'

const page = () => {
  return (
    <div className='flex h-full justify-center items-center'>
      <motion.h1
      initial={{ opacity: 0, scale: 0.8 }} // fade and slight shrink at start
        animate={{
          opacity: [0, 1, 1],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          opacity: { duration: 1, ease: 'easeInOut' }, // fade-in duration
          scale: {
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        }}
      
      className='text-[#544df2] text-5xl drop-shadow-[0_0_10px_rgba(84,77,242,0.5)]'>
        Coming soon!!!
      </motion.h1>
    </div>
  )
}

export default page