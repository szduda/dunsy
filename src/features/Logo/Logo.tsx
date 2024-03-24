import { LogoIcon, DundunSetIcon } from '@/features/Icons'
import { Icon } from '../Icons/types'
import { cx } from '@/utils'
import { useState } from 'react'
import Link from 'next/link'

export const Logo: Icon = (props) => {
  const [dundunTime, itsDundunTime] = useState(0)
  const [hint, setHint] = useState('')
  const [hintVisible, setHintVisible] = useState(false)

  let timeout: NodeJS.Timeout
  const showHint = (data: unknown) => {
    setHint(String(data))
    if (data) {
      setHintVisible(true)
      timeout = setTimeout(() => setHintVisible(false), 500)
    }
  }

  return (
    <Link href='/' className='flex items-center scale-75 md:scale-100'>
      <div className='relative'>
        <DundunSetIcon
          height={128}
          innerClass2='animate-dundun origin-center'
          {...props}
          className={cx([
            props.className,
            dundunTime < 4
              ? 'opacity-0 pointer-events-none'
              : 'animate-spin-logo-once',
            'absolute origin-center transition-all duration-500 delay-100 -rotate-[30deg]',
          ])}
        />
        <LogoIcon
          height={128}
          innerClass2='animate-dundun origin-center'
          {...props}
          className={cx([
            props.className,
            dundunTime > 3 && 'opacity-0 animate-spin pointer-events-none',
            'origin-center transition-all duration-500',
          ])}
          onStickClick={() => {
            itsDundunTime(dundunTime + 1)
            showHint(dundunTime + 1)
          }}
        />
        <div
          className={cx([
            'text-yellowy font-bold absolute transition ease-in-out',
            hint === '4' ? 'duration-1000' : 'duration-500',
            !hintVisible && 'opacity-0',
            hint === '2'
              ? 'translate-x-4'
              : hint === '3'
                ? 'translate-x-8'
                : hint === '4'
                  ? '-translate-x-96'
                  : '',
          ])}
        >
          {hint}
        </div>
      </div>
      <h1
        className={cx([
          'font-black text-5xl text-graye tracking-wide transition duration-500 ease-in-out',
          dundunTime > 3 && 'translate-y-12 -translate-x-1',
        ])}
      >
        dunsy<small className='text-2xl opacity-50'>.app</small>
      </h1>
    </Link>
  )
}
