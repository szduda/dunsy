'use client'

import { ComponentProps, FC, ReactNode, Suspense, useEffect } from 'react'
import { useSearch } from '../Search/useSearch'
import { LOGO_ID } from './constants'

export const WithScrollToNav: FC<{ children: ReactNode }> = ({ children }) => {
  const { searchQuery } = useSearch()

  useEffect(() => {
    if (searchQuery) {
      const logoSectionHeight =
        document.querySelector(`#${LOGO_ID}`)?.clientHeight ?? 0

      if (document.body.scrollTop < logoSectionHeight) {
        setTimeout(
          () =>
            document
              .querySelector('nav')
              ?.scrollIntoView({ behavior: 'smooth' }),
          100
        )
      }
    }
  }, [Boolean(searchQuery)])

  return children
}
