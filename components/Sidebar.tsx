'use client' //whenever we use a hook like usePathname(); we should add this 'use client' directive at the top of the file like in MobileNav.tsx.

import React from 'react'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';
import  Link  from 'next/link';
import Image from 'next/image';



const Sidebar = () => {
    //its used to track, which path/tab we are in the sidebar
    const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
        <div className='flex flex-1 flex-col gap-6 '>
            {/* sidebarLinks - coming from constants folder | below, looping the sidebar tabs */}
            {sidebarLinks.map((link) => { 
                
                // checking is the pathname is currently active. eg:startsWith-meeting/home/previout,all other tabs | link.route - id
                const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`); //|| pathname.startsWith(link.route); if we use this(after ||) the HOME TAB is selected by default evenif we click on other tabs.

                return(
                    <Link
                        href={link.route}
                        key={link.label}
                        //cn is used to apply dynamic className with certain conditions like below ''bg-blue-1; will get applied only is the tab is Active.
                        className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {'bg-blue-1': isActive,})}
                    >
                        {/*below we are simply rendering this <Link> style format for each tabs in sidebar */}
                        
                        <Image
                            src={link.imgUrl}
                            alt={link.label}
                            width={24}
                            height={24}
                        />

                        <p className='text-lg font-semibold max-lg:hidden'>
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

