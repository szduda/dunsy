'use client'

import { FC, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from './Header'

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
      <Header compact={pathname !== '/'} />
      <div className='relative'>{children}</div>
    </div>
  )
}
