import React from 'react'
import { afacad } from '../fonts'
import Image from 'next/image'
import waveEmoji from '../../../public/waving-hand-emoji.svg'
import totalSpendingsIcon from '../../../public/totalSpending-icon.svg';
import activeSubscriptionsIcon from '../../../public/activeSubscriptions-icon.svg';
import upcomingRenewalsIcon from '../../../public/upcomingRenewals-icon.svg';
import expiredSubscriptionsIcon from '../../../public/expiredSubscriptions-icon.svg';
import Cards from './components/Cards'
import SubscriptionsCon from './components/SubscriptionsCon';

const page = () => {
  return (
    <div className=''>
      <nav className='w-full flex items-center px-5 bg-[#FFFFFF] h-[50px]'>
        <h1 className={`${afacad.className} text-[#6D6666] text-2xl`}>Dashboard</h1>
      </nav>

      <div className="container px-6 py-6">
        <div className='flex gap-2 items-center'>
          <h1 className={`${afacad.className} text-4xl tedxt-[##454141]`}>Welcome, <span className='text-[#544DF2]'>John</span></h1>
        <Image src={waveEmoji} alt='waving-emoji' className='h-8 w-auto' />
        </div>

       <div className="flex flex-con justify-center gap-2 flex-wrap md:flex-row md:justify-between mt-4">
        <Cards title='Total Spendings' value='$100,350' src={totalSpendingsIcon} />
        <Cards title='Active Subscriptions' value='' src={activeSubscriptionsIcon} />
        <Cards title='Upcoming Renewals' value='' src={upcomingRenewalsIcon} />
        <Cards title='Expired Subscriptions' value='10' src={expiredSubscriptionsIcon} />
       </div>

       <SubscriptionsCon />
        
      </div>
    </div>
  )
}

export default page