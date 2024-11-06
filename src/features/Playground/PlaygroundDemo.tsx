'use client'

import { useState } from 'react'
import { BarsCanvas } from '../GroovyPlayer/canvas/BarsCanvas'

export const PlaygroundDemo = () => {
  const [playgroundClicks, setPlaygroundClicks] = useState(0)
  return (
    <div className='flex flex-col gap-4 items-center justify-center'>
      <div
        onMouseDown={(e) => e.preventDefault()}
        onClick={(e) => {
          e.preventDefault()
          setPlaygroundClicks(playgroundClicks + 1)
        }}
      >
        <BarsCanvas
          large
          demo
          readonly={false}
          id='playground-demo'
          instrument='djembe'
          bars={['f-tsb-']}
        />
      </div>
      <p className='text-sm text-center font-medium text-graye-light select-none'>
        {playgroundClicks > 5 ? (
          'Truly amazing phrase :)'
        ) : playgroundClicks > 1 ? (
          <>Yes! That&apos;s the way</>
        ) : (
          'Try clicking shapes'
        )}
      </p>
    </div>
  )
}
