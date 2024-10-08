import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (

    //the flex-between is not the tailwindcss property rather it defined by us in globals.css file see that
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10"> 
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/connectLogo.png"
          width={64}
          height={64}
          alt="CONNECT logo"
          className="max-sm:size-10"
        />
        {/* in tailwindcss whenever we want to apply specific values, we put that inside [] brackets eg:text-[12px] */}
        <p className="font-serif text-[26px] font-extrabold text-connect-1 max-sm:hidden"> 
          CONNECT
        </p>
      </Link>

      {/* the flex-between is not the tailwindcss property rather it defined by us in globals.css file see that */}
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton/>
        </SignedIn>

        <MobileNav />
      </div>      


    </nav>
  )
}

export default Navbar