import Link from 'next/link'
import { Button } from '@/features/rsc'

export default function NotFound() {
  return (
    <main className='flex mx-auto justify-center px-2 pt-2 md:pt-8 pb-8 max-w-[1024px]'>
      <div className='flex flex-col items-center'>
        <div className='rounded-lg mt-8 md:mt-16 w-[210px] h-[297px] md:w-[300px] md:h-[400px] bg-whitey/10' />
        <h2 className='my-8 md:my-16 w-full text-center text-redy-dark text-4xl tracking-wider'>
          Page Not Found
        </h2>
        <h3 className='w-full text-6xl text-center text-greeny-dark'>404</h3>
        <Link href='/grooves' className='w-fit' scroll={false}>
          <Button className='my-8 md:my-16 hover:animate-pulse bg-yellowy hover:bg-yellowy-light'>
            <span className='text-blacky'>Find your page</span>
          </Button>
        </Link>
      </div>
    </main>
  )
}
