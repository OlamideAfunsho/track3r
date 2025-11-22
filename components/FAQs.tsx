"use client";

import React, { useState } from 'react'

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
    const faqsData = [
        {
            question: 'What happens at the end of the trial?',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed libero tincidunt, suscipit nibh et, placerat eros.'
        },
        {
            question: 'Can I cancel any time?',
            answer: 'Fusce condimentum dolor sem, a faucibus lacus ullamcorper non. Nullam lobortis semper purus id laoreet.'
        },
        {
            question: 'Is there a free trial?',
            answer: 'Mauris ac volutpat turpis. Nunc leo nibh, tempor a justo sagittis, facilisis molestie nibh. Vestibulum dapibus id nibh vitae aliquam.'
        },
        {
            question: 'Should I use Track3r?',
            answer: 'Aliquam ex nunc, sollicitudin venenatis molestie id, facilisis et nibh.'
        },
        {
            question: 'What is Track3r?',
            answer: 'Quite the curious one, are you? 😊'
        }
    ]
    return (
        <>
            
            <div className='flex flex-col items-center text-center bg-[#EFEFF1] px-8 md:px-3  pt-20 pb-30 md:pb-40'>
                
                <h1 className='text-[26px]/10 md:text-5xl/10 text-[#929297] font-bold mt-0 md:mt-2 mb-4'>Frequently Asked Questions</h1>
                
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