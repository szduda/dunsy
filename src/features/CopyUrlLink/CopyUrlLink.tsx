'use client'
import { ComponentProps, FC, useEffect, useState } from 'react'
import { Button } from '@/features/Button'
import { cx } from '@/utils'

export const CopyUrlLink: FC<ComponentProps<typeof Button>> = ({
  className,
  ...props
}) => {
  const [success, setSuccess] = useState(false)
  let timeout: NodeJS.Timeout | undefined
  useEffect(() => () => clearTimeout(timeout), [timeout])

  return (
    <div
      className={cx([
        'border rounded-md ',
        success ? 'border-greeny/50' : 'border-yellowy/25',
        className,
      ])}
    >
      <Button
        disabled={success}
        className={cx([success && 'scale-[121.1%] !opacity-100 !filter-none'])}
        ninja
        {...props}
        onClick={async () => {
          await navigator.clipboard.writeText(document.location.href)
          setSuccess(true)
          timeout = setTimeout(() => setSuccess(false), 3000)
        }}
      >
        {success ? 'Link copied' : 'Copy Link'}
      </Button>
    </div>
  )
}
