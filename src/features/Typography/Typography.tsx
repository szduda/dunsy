import Link from 'next/link'
import { ComponentProps, FC } from 'react'
import { External } from '../Icons/External'

export const Paragraph: FC<ComponentProps<'p'>> = (props) => (
  <p className='mt-6 text-xl leading-relaxed tracking-wide' {...props} />
)

export const H2: FC<ComponentProps<'h2'>> = (props) => (
  <h2
    className='text-graye text-3xl mt-24 drop-shadow-lg tracking-wider'
    {...props}
  />
)

export const TextLink: FC<ComponentProps<typeof Link>> = (props) => {
  const link = (
    <Link
      className='font-semibold underline decoration-greeny-light hover:decoration-greeny-light hover:decoration-4 tracking-widest'
      scroll={false}
      {...props}
    />
  )

  const href = props.href.toString()
  console.log(href)
  if (
    href.startsWith(process.env.NEXT_PUBLIC_BASE_URL ?? 'https://dunsy.app') ||
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('mailto:')
  ) {
    return link
  }

  return (
    <span className='group'>
      <span className='pr-1'>{link}</span>
      <span className='inline-flex text-graye group-hover:text-orangey group-hover:scale-110 rounded-md'>
        <External className='inline' />
      </span>
    </span>
  )
}
