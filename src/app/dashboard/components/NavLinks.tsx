"use client"

import dashboardIcon from '../../../../public/dashboard-navlinks-icon-1.svg'
import subscriptionsIcon from '../../../../public/dashboard-navlinks-icon-2.svg'
import walletIcon from '../../../../public/dashboard-navlinks-icon-3.svg'
import analyticsIcon from '../../../../public/dashboard-navlinks-icon-4.svg'
import sharedBillsIcon from '../../../../public/dashboard-navlinks-icon-5.svg'
import calendarIcon from '../../../../public/dashboard-navlinks-icon-6.svg'


import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image'


const links = [
  { name: 'Dashboard', href: '/dashboard', icon: dashboardIcon },
  {
    name: 'My Subscriptions',
    href: '/dashboard/subscriptions',
    icon: subscriptionsIcon,
  },
  { name: 'Wallet', href: '/dashboard/wallet', icon: walletIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: analyticsIcon },
  { name: 'Shared Bills', href: '/dashboard/sharedBills', icon: sharedBillsIcon },
  { name: 'Calendar', href: '/dashboard/calendar', icon: calendarIcon },
];

export default function NavLinks() {

  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-[5px] p-3 text-[12px] font-normal hover:bg-[#E9E8FF] text-[#8B97B4] hover:text-[#544DF2] md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-[#E9E8FF] text-[#544DF2]': pathname === link.href,
              },
            )}
          >
            <Image src={link.icon} alt='nav-icons' />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
