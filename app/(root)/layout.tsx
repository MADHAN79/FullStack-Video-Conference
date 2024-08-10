//the component wraps all the other pages within it.

import React, { ReactNode } from 'react'

const RootLayout = ({ children }: {children: ReactNode}) => { //since its typescript we are declaring children type as ReactNode
  return (
    <main>
        {children}
    </main>
  )
}

export default RootLayout
