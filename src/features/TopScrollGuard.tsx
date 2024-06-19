import { FC, useEffect } from 'react'

type Props = { top?: number; logoLine?: boolean }

export const TopScrollGuard: FC<Props> = ({ top = 0, logoLine = false }) => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    const logoHeight = isMobile ? 185 : 225
    const targetScroll = logoLine ? logoHeight : top
    window.scrollTo({
      top: targetScroll,
      behavior: window.scrollY - targetScroll > 400 ? 'instant' : 'smooth',
    })
  }, [])

  return null
}
