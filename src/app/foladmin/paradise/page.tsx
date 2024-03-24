import { RevalidateInput, RevalidateAll } from '@/features/admin'

const AdminParadisePage = () => (
  <main className='fixed top-0 left-0 right-0 flex flex-col items-center justify-center px-1 md:px-8 pt-12 pb-24 bg-blacky min-h-full'>
    <div className='flex flex-col items-center mx-auto max-w-[960px] text-greeny'>
      <h1 className='w-full text-3xl opacity-25'>Admin Paradise</h1>
      <div className='border border-1 border-greeny-dark/50 border-dashed mt-12 pb-4'>
        <h2 className='w-full mb-4 text-xl text-graye p-4 border-b border-1 border-greeny-dark/50 border-dashed'>
          Revalidation Subparadise
        </h2>
        <div className='p-4'>
          <RevalidateInput />
          <div className='flex w-full items-center mt-8'>
            <RevalidateAll />
          </div>
        </div>
      </div>
    </div>
  </main>
)

export default AdminParadisePage
