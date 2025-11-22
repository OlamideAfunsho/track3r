import { afacad } from '@/app/fonts'
import React from 'react'
import walletIcon from '../../../../public/wallet-icon.svg'
import Image from 'next/image'


const page = () => {
  return (
    <div className='px-4 py-6 h-[500px]'>
      <h1 className={`${afacad.className} flex items-center gap-2 md:text-left text-2xl mb-2`}>Wallet <span className='text-[#544DF2]'>Page</span><Image src={walletIcon} alt='wallet-icon' /></h1>
      <p className={`${afacad.className} text-[#667085] mb-2`}>Your wallet will let you deposit, withdraw, and track transactions securely.</p>

      <button className='bg-[#544DF2] text-[14px] text-[#FFFFFF] px-4 py-2.5 rounded-[8px] right-0 hover:bg-[rgba(84,77,242,0.8)] shadow-[inset_0px_4px_11.2px_0px_#FAFAFAA1]'>
                  Add Funds (Coming soon)
      </button>
      
    </div>
  )
}

export default page