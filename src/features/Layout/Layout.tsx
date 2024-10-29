'use client'

import { FC, ReactNode, Suspense } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from './Header'
import { WithScrollToNav } from './WithScrollToNav'

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
      <Suspense key={pathname}>
        <WithScrollToNav>
          <Header />
        </WithScrollToNav>
      </Suspense>
      <div className='relative min-h-screen'>{children}</div>
    </div>
  )
}
