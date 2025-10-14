"use client";

import React, { useState } from 'react'

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
    const faqsData = [
        {
            question: 'What happens at the end of the trial?',
            answer: 'Built with speed — minimal load times and optimized rendering.'
        },
        {
            question: 'Can I cancel any time?',
            answer: 'Easily adjust styles, structure, and behavior to match your project needs.'
        },
        {
            question: 'Is there a free trial?',
            answer: 'Every component are responsive by default — no extra CSS required.'
        },
        {
            question: 'Tailwind CSS Powered',
            answer: 'Built using Tailwind utility classes — no extra CSS or frameworks required.'
        },
        {
            question: 'Dark Mode Support',
            answer: 'All components come ready with light and dark theme support out of the box.'
        }
    ]
    return (
        <>
            
            <div className='flex flex-col items-center text-center bg-[#EFEFF1] px-8 md:px-3  pt-20 pb-30 md:pb-40'>
                
                <h1 className='text-3xl md:text-5xl font-bold mt-0 md:mt-2 mb-4'><span className='text-[#929297]'>Frequently</span> Asked <span className='text-[#544DF2]'>Questions</span></h1>
                
                <div className='max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left'>
                    {faqsData.map((faq, index) => (
                        <div key={index} className='flex flex-col items-start w-full '>
                            <div className='flex items-center justify-between w-full cursor-pointer bg-[#FFFFFF] p-4 rounded-[12px]' onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                <h2 className='text-sm text-[#3B404D]'>{faq.question}</h2>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                    <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FAQs