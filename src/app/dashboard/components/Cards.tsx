import Image, { StaticImageData } from 'next/image'
import React from 'react'

const Cards = ({title, value, src,}: {title: string; value: number | string; src: StaticImageData | string;}) => {
  return (
    <div className='w-11/12 lg:w-[270px] h-[120px] md:h-[100px] lg:h-[100px] flex flex-col justify-around lg:justify-between rounded-[11px] shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] p-4 md:p-2 lg:p-2'>
        <div className="flex items-center gap-1">
            <Image src={src} alt='' className='w-9 md:w-6 lg:w-9'/>
        <span className={`text-[#667085] text-[16px] md:text-[10px] lg:text-[16px] font-light`}>{title}</span>
        </div>
        <span className='text-[#50545E] font-medium text-3xl md:text-[18px]  lg:text-3xl'>{value}</span>
    </div>
  )
}

export default Cards