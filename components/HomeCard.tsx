import { cn } from '@/lib/utils'; //cn is for dynamic className allocation i.e: dynamic styling
import Image from 'next/image'
import React from 'react'


//interface is basically TYPES IN TYPESCRIPT which is extendable
interface HomeCardProps {
    className?: string;
    img: string;
    title: string;
    description: string;
    handleClick?: () => void;
  }

//all these HomeCard props are coming from MeetingTypeList.tsx
const HomeCard = ({ className, img, title, description, handleClick }: HomeCardProps) => {
  return (
    <div className={cn(
        'bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
        className //this className is an additional parameter that can be passed in cn func.
      )}
      onClick={handleClick}
    >
            <div className="flex-center glassmorphism size-12 rounded-[10px]">
                <Image src={img} alt='meeting' width={27} height={27} />
            </div>

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">{title}</h1>
                <p className="text-lg font-normal">{description}</p>
            </div>
    </div>
  )
}

export default HomeCard