'use client';
import { sidebarLinks } from '@/constants'
import Link from 'next/link';
import { cn } from '@/lib/utils'
import React from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image';

const Sidebar = () => {
  const pathname=usePathname()
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fix flex-col justify-between bg-[#1C1F2E] p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
      <div className='flex flex- flex-col gap-6'>
        {sidebarLinks.map((link)=>{
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)
          return(
            <Link
            href={link.route}
            key={link.label}
            className={cn('flex gap-4 items-center p-4 rounded-lg',{
            'bg-[#0E78F9]': isActive
            })}
            >
              <Image
              src={link.imgURL}
              alt={link.label}
              width={24}
              height={24}
              />
              <p className='text-lg font-semibold'>
                {link.label}
              </p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Sidebar