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
    <div>
      <AnimatedHeader />
      <div className='relative min-h-screen'>{children}</div>
    </div>
  )
}
