import { FC, ReactNode } from 'react'
import { AuthContextProvider, PickSnippetProvider } from '@/features/admin'

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <AuthContextProvider>
    <PickSnippetProvider>
      <header className='justify-center items-center pt-14 pb-8 px-4 w-full hidden md:flex'>
        <h1 className='font-black p-4 text-3xl text-redy-dark'>edundytor</h1>
      </header>
      {children}
    </PickSnippetProvider>
  </AuthContextProvider>
)

export default AdminLayout
