'use client'

import { ComponentProps, FC, Suspense, useEffect } from 'react'
import { useSearch } from '../Search/useSearch'
import { LOGO_ID } from './constants'

export const WithScrollToNav: FC<ComponentProps<typeof Suspense>> = (props) => {
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

  return <Suspense {...props} />
}
