import { useState, useEffect } from 'react'
import { debounce } from 'lodash-es'

type Props = {
  canvasId: string
  defaultWidth?: number
}

export const useCanvasWidth = ({ canvasId, defaultWidth = 280 }: Props) => {
  const [canvasWidth, setCanvasWidth] = useState(defaultWidth)

  useEffect(() => {
    const handler = () => {
      setCanvasWidth(
        document.getElementById(canvasId)?.parentElement?.clientWidth ?? defaultWidth
      )
    }
    handler()

    const debouncedHandler = debounce(handler, 500)
    window.addEventListener('resize', debouncedHandler)
    return () => window.removeEventListener('resize', debouncedHandler)
  }, [])

  return canvasWidth
}
