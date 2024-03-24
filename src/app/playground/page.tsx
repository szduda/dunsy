import { Playground } from '@/features/Playground'
import { FC } from 'react'

const PlaygroundPage: FC = () => {
  return (
    <main className='flex mx-auto flex-col items-center pt-8 max-w-[1024px] min-h-[calc(100dvh-58px)] px-2'>
      <Playground />
    </main>
  )
}

export default PlaygroundPage
