'use client'

import { FC, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatedHeader } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname()

  if (pathname.startsWith('/foladmin')) {
    return children
  }

  return (
    <div className='transition-all duration-500 ease-in-out'>
      <AnimatedHeader />
      <div className='relative'>{children}</div>
    </div>
  )
}
