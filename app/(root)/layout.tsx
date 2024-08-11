//the component wraps all the other pages within it.

import StreamVideoProvider from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'

const RootLayout = ({ children }: {children: ReactNode}) => { //since its typescript we are declaring children type as ReactNode
  return (
    <main>
        {/* only by wrapping children the entrire application knows it has the stream video provider */}
        <StreamVideoProvider>{children}</StreamVideoProvider> 
    </main>
  )
}

export default RootLayout
