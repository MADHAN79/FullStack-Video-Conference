'use client' //whenever we use a hook like usePathname(); we should add this 'use client' directive at the top of the file like in Sidebar.tsx 

import { Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
  

const MobileNav = () => {
    const pathname = usePathname(); //used to know which path is active.

  return (
    <section className="w-full max-w-[264px]">
        <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="hamburger icon"
            className="cursor-pointer sm:hidden" //hidden in small devices
          />
          </SheetTrigger>
            <SheetContent side="left" className="border-none bg-dark-1">
            <Link href="/" className="flex links-center gap-1">
                <Image
                src="/icons/connectLogo.png"
                width={64}
                height={64}
                alt="CONNECT logo"
                className="max-sm:size-10"
                />
                {/* in tailwindcss whenever we want to apply specific values, we put that inside [] brackets eg:text-[12px] */}
                <p className="font-serif text-[26px] font-extrabold text-connect-1"> 
                CONNECT
                </p>
            </Link>

            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((link) => {
                  const isActive = pathname === link.route;

                  return (
                    // only if we use sheetclose to wrap everything, each time we select a tab the sidebar automatically gets closed
                    <SheetClose asChild key={link.route}> 
                      <Link
                        href={link.route}
                        key={link.label}
                        className={cn(
                          'flex gap-4 links-center p-4 rounded-lg w-full max-w-60',
                          {
                            'bg-blue-1': isActive,
                          }
                        )}
                      >
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className="font-semibold">{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>

            </SheetContent>
        </Sheet>

    </section>
  )
}

export default MobileNav