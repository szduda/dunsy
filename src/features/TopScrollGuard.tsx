import { FC, useEffect } from 'react'

type Props = { top?: number; logoLine?: boolean }

export const TopScrollGuard: FC<Props> = ({ top = 0, logoLine = false }) => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 768
    const logoHeight = isMobile ? 185 : 225
    window.scrollTo({
      top: logoLine ? logoHeight : top,
      behavior: 'smooth',
    })
  }, [])

  return null
}
