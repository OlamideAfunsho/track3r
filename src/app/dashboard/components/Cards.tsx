import Image from 'next/image'
import React from 'react'

const Cards = ({title, value, src,}: {title: string; value: number | string; src: any;}) => {
  return (
    <div className='w-11/12 md:w-[250px] h-[120px] md:h-[100px] flex flex-col justify-around md:justify-between rounded-[11px] shadow-[0_0_40px_5px_rgba(0,0,0,0.1)] p-4 md:p-2'>
        <div className="flex items-center gap-1">
            <Image src={src} width={35} alt='' />
        <span className={`text-[#667085] text-[16px] font-light`}>{title}</span>
        </div>
        <span className='text-[#50545E] font-medium text-3xl'>{value}</span>
    </div>
  )
}

export default Cards