import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/features/rsc'
import { useSnippetForm } from '../SnippetFormContext'

export const FormSuccessScreen: FC = () => {
  const { success, resetForm, editAgain, mode } = useSnippetForm()

  if (!success) {
    return null
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='relative w-full h-[530px]'>
        <Image
          fill
          className='rounded-lg my-8 object-cover'
          src='/gods.jpeg'
          quality={80}
          alt='Happy African Gods'
        />
      </div>
      <h2 className='my-8 md:my-16 w-full text-center text-greeny-light text-4xl tracking-wider'>
        Mandé Gods are pleased with your sacrifice
      </h2>
      {mode === 'update' ? (
        <Button className='mt-8' onClick={editAgain}>
          Edit this rhythm again
        </Button>
      ) : (
        <Button className='mt-8' onClick={resetForm}>
          Add another rhythm
        </Button>
      )}
      <Link href='/foladmin'>
        <Button className='mt-8 bg-transparent md:hover:bg-transparent border-transparent hover:border-graye'>
          <span className='text-graye-light'>Go to the mountains</span>
        </Button>
      </Link>
    </div>
  )
}
