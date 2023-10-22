import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { getSnippet } from '@/features/SnippetApi'
import { useAuth } from '@/features/admin'
import { PickSnippetContext } from './types'

export const Context = createContext<PickSnippetContext>({
  canEdit: false,
  loading: false,
  initialData: null,
  pick: () => null,
  resetPick: () => null,
})
export const usePickSnippet = () => useContext(Context)

export const PickSnippetProvider: FC<{ children: ReactNode }> = (props) => {
  const router = useRouter()
  const pathname = usePathname()
  const isAddRoute = pathname.search(/\/groove\/new$/) > 0
  const { user, userData } = useAuth()
  const [initialData, setInitialData] =
    useState<PickSnippetContext['initialData']>(null)
  const [loading, setLoading] = useState(!isAddRoute)
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    if (isAddRoute) {
      return
    }

    const index = pathname.search(/\/groove\/(.+)$/)
    if (index > 0) {
      const idFromUrl = pathname.substring(index + 8)
      pick(idFromUrl)
    } else {
      resetPick()
    }
  }, [pathname])

  useEffect(() => {
    setCanEdit(userData?.isAdmin ?? false)
  }, [userData])

  const pick = async (id: string) => {
    setLoading(true)
    try {
      const snippet = await getSnippet(id)
      const data = { id, ...snippet }
      setInitialData(data)
      if (data.authorUid === user?.uid || userData?.isAdmin) {
        setCanEdit(true)
      }
    } catch (error) {
      setInitialData(null)
      router.push('/foladmin')
    }
    setLoading(false)
  }

  const resetPick = () => {
    setInitialData(null)
    setLoading(false)
  }

  return (
    <Context.Provider
      {...props}
      value={{
        initialData,
        canEdit,
        pick,
        loading,
        resetPick,
      }}
    />
  )
}
