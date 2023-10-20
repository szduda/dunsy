import Link from 'next/link'
import { GarageMonitor } from '@/features/admin'
import { Button } from '@/features/rsc'

const AdminPage = () => (
  <main className='flex mx-auto flex-col items-center justify-center pt-8 pb-8 max-w-[960px]'>
    <div className='w-screen h-screen bg-cover bg-guard bg-center fixed top-0 -z-10' />
    <div className='w-screen h-screen fixed top-0 bg-blacky/90 -z-10' />
    <div className='flex flex-col md:flex-row items-center md:justify-around w-full bg-yellowy-dark/5 md:rounded-xl py-4'>
      <div className='w-full md:w-[240px] p-4 md:py-8'>
        <Link href={'/foladmin/groove/new'}>
          <Button className='md:min-w-full border-transparent'>Create</Button>
        </Link>
      </div>
      <div className='w-full md:w-[240px] p-4 md:py-8'>
        <Link href={'/foladmin/groove'}>
          <Button className='md:min-w-full border-transparent'>
            View / Update
          </Button>
        </Link>
      </div>
    </div>
    <GarageMonitor />
  </main>
)

export default AdminPage
