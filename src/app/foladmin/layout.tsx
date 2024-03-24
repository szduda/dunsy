import { FC, ReactNode } from 'react'
import { AuthContextProvider, PickSnippetProvider } from '@/features/admin'
import Link from 'next/link'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <AuthContextProvider>
    <PickSnippetProvider>
      <header className='justify-center items-center pt-14 pb-8 px-4 w-full hidden md:flex'>
        <Link href='/foladmin'>
          <h1 className='font-black p-4 text-3xl text-redy-dark'>edundytor</h1>
        </Link>
      </header>
      {children}
    </PickSnippetProvider>
  </AuthContextProvider>
)

export default AdminLayout
