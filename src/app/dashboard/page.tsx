import React from 'react'
import { supabase } from "@/lib/supabaseClient";
import { afacad } from '../fonts'
import Image from 'next/image'
import waveEmoji from '../../../public/waving-hand-emoji.svg'

import DashboardStats from './components/DashboardStats'
import Link from 'next/link';

const page = async () => {
  const { data: bills, error } = await supabase.from("bills").select("*");

  if (error) {
    console.error(error);
    return <p>Failed to load bills</p>;
  }

  if (!bills || bills.length === 0) {
    return (
      <div className='flex gap-2 justify-center items-center h-full'>
        <p>No bills yet. Add one to get started!</p>
        <Link href='/dashboard/add-bill' className='bg-[#544DF2] text-[14px] text-[#FFFFFF] px-[16px] py-[6px] rounded-[8px] hover:bg-[rgba(84,77,242,0.8)]'>
            Add Bill <span className='text-[20px]'>+</span>
          </Link>
      </div>

    );
  }

  return (
    <div className=''>
      <div className='w-full flex items-center px-5 bg-[#FFFFFF] h-[50px]'>
        <h1 className={`${afacad.className} text-[#6D6666] text-2xl`}>Dashboard</h1>
      </div>

      <div className="container px-6 py-6">
        <div className='flex gap-2 items-center'>
          <h1 className={`${afacad.className} text-4xl text-[##454141]`}>Welcome, <span className='text-[#544DF2]'>John</span></h1>
          <Image src={waveEmoji} alt='waving-emoji' className='h-8 w-auto' />

          <Link href='/dashboard/add-bill' className='bg-[#544DF2] text-[14px] text-[#FFFFFF] px-[16px] py-[6px] rounded-[8px] absolute right-6 hover:bg-[rgba(84,77,242,0.8)]'>
            Add Bill <span className='text-[20px]'>+</span>
          </Link>
        </div>

      <DashboardStats />


        <h1 className={`${afacad.className} text-[#667085] text-[18px]`}>Subscriptions</h1>
        <Link href='/dashboard/subscriptions' className={`${afacad.className} text-[#9C98F7] text-[16px]`}>Manage your subscriptions</Link>
        {/* Subscriptions Table */}
        <div className="w-full md:w-3/5 p-4 border rounded-[7px] bg-[#F2F7FF] mt-4">
          <div className="overflow-x-auto">
            <table className={`${afacad.className} min-w-full text-sm text-left`}>
              <thead className="text-[#50545E] text-[16px]">
                <tr>
                  <th className="px-6 py-3">Service</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Due Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => (
                  <tr
                    key={bill.id}
                    className=""
                  >
                    <td className="flex gap-1 items-center px-6 py-4 font-medium text-[#50545E]">
                      {bill.logo_url && (
                        <img
                          src={bill.logo_url}
                          alt={`${bill.title} logo`}
                          className="w-6 h-6"
                        />
                      )}
                      {bill.title}
                    </td>
                    <td className="px-6 py-4 text-[#50545E]">₦{bill.amount}</td>
                    <td className="px-6 py-4 text-[#50545E]">{bill.due_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page