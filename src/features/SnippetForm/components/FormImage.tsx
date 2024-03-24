import { FC } from 'react'
import Image from 'next/image'
import { useSnippetForm } from '../SnippetFormContext'

export const FormImage: FC = () => {
  const { mode } = useSnippetForm()
  return (
    <div className='mx-auto w-full md:w-[450px] h-[450px] relative'>
      <Image
        fill
        sizes='(max-width: 767px) 100%, 450px'
        quality={80}
        placeholder='blur'
        blurDataURL='/fallback.jpeg'
        alt='The rhythm vault host in person'
        src={`/hotpot-ai/${
          mode === 'update'
            ? 'updator'
            : mode === 'create'
              ? 'creator'
              : 'reador'
        }.png`}
        className='rounded-lg object-cover'
      />
    </div>
  )
}
