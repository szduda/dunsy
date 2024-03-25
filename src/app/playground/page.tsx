import { TopScrollGuard } from '@/features'
import { CopyUrlLink } from '@/features/CopyUrlLink'
import { Playground } from '@/features/Playground'
import { FC } from 'react'

const PlaygroundPage: FC = () => {
  return (
    <main className='flex mx-auto flex-col items-center pt-8 max-w-[1024px] min-h-[calc(100dvh-58px)] px-2'>
      <TopScrollGuard top={0} />
      <h1 className='text-greeny text-3xl mt-16'>Playground</h1>
      <sub className='text-graye text-lg mb-16'>create shareable loops</sub>
      <CopyUrlLink className='mb-12' />
      <Playground />
    </main>
  )
}

export default PlaygroundPage
