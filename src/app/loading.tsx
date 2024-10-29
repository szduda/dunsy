import { Loader } from '@/features/Layout/Loader'
import Image from 'next/image'

export const Loading = () => (
  <main className='opacity-50 mt-8 md:mt-12 overflow-hidden'>
    <Loader />
  </main>
)

export default Loading
