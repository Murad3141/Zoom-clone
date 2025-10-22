import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center fixed z-50 w-full bg-[#1C1F2E] px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
      <Image
      src="./icons/logo.svg"
      width={32}
      height={32}
      alt='Yoom logo'
      className='max-sm:size-10'
      />
      <p className='font-extrabold text-white text-[26px] max-sm:hidden'>Yoom</p>
      </Link>
      <div className='flex justify-between items-center gap-5'>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <MobileNav/>
      </div>
    </nav>
  )
}

export default Navbar