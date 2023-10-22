import { FC } from 'react'
import Image from 'next/image'
import { useSnippetForm } from '../SnippetFormContext'

export const FormImage: FC = () => {
  const { mode } = useSnippetForm()
  return (
    <div className='mx-auto w-full md:w-1/3 h-[450px] relative'>
      <Image
        fill
        sizes='450'
        quality={80}
        placeholder='blur'
        blurDataURL='/fallback.jpeg'
        alt='The rhythm vault host in person'
        src={
          mode === 'update'
            ? '/godess2.jpeg'
            : mode === 'create'
            ? '/host.jpeg'
            : '/godess.jpeg'
        }
        className='rounded-lg object-cover'
      />
    </div>
  )
}
