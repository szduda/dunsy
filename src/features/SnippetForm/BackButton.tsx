import { ComponentProps, FC } from 'react'
import Link from 'next/link'
import { ArrowIcon } from '@/features/Icons'

export const BackButton: FC<ComponentProps<typeof Link>> = ({ href }) => (
  <Link
    className='p-2 md:px-4 text-lg text-graye absolute top-8 left-2 tracking-wider rounded-md hover:bg-[#0002] hover:scale-110 transition-all flex items-center'
    href={href}
  >
    <ArrowIcon className='fill-graye rotate-180 mr-2' /> Back
  </Link>
)
