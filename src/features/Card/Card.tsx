import { FC, ReactNode } from 'react'
import Link from 'next/link'
import { CardTags } from '@/features'
import { SnippetCard } from '@/features/SnippetApi'

export const Card = ({ slug, title, tags }: SnippetCard) => (
  <Link
    href={{ pathname: slug }}
    scroll={false}
    className='p-2 lg:p-3 lg:pt-2 rounded-lg bg-blacky/50 flex flex-col justify-evenly hover:bg-blacky/75 hover:scale-105 transition'
  >
    <>
      <CardTags tags={tags!} className='-mx-1' />
      <div className='pt-2 text-lg capitalize font-medium'>{title}</div>
    </>
  </Link>
)

const Placeholder: FC<{ i: number }> = ({ i }) => (
  <div className='px-2 py-3 lg:p-3 rounded-lg bg-blacky/30 flex flex-col justify-between transition gap-3'>
    <div className='flex gap-1'>
      <div className='h-5 bg-graye/5 w-[35px] rounded-lg' />
      <div className='h-5 bg-graye/5 w-[65px] rounded-lg' />
      <div className='h-5 bg-graye/5 w-[50px] rounded-lg' />
    </div>
    <div
      className='h-8 bg-graye-light/5 w-[120px] rounded-xl animate-pulse'
      style={{ animationDelay: `${i}00ms` }}
    />
  </div>
)

Card.Placeholder = Placeholder
Card.Placeholder.displayName = 'Card.Placeholder'
