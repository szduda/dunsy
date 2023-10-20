import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Snippet, getSnippet } from '@/features/SnippetApi'
import { useAuth } from '@/features/admin'

const defaultFormData: Snippet = {
  id: '',
  slug: '',
  authorUid: '',
  title: '',
  description: '',
  tags: '',
  swing: '',
  tempo: '110',
  signal: '',
  patterns: {
    dundunba: '',
    sangban: '',
    kenkeni: '',
    kenkeni2: '',
    bell: '',
    djembe: '',
  },
}

export type FormData = typeof defaultFormData

type PickSnippetContext = {
  canEdit: boolean
  loading: boolean
  initialData: Partial<FormData> | null
  pick(id: string): void
  reset(): void
  formData: FormData
  updateFormData(data: Partial<FormData>): void
  resetFormData(): void
  currentBarSize: number
}

export const Context = createContext<PickSnippetContext>({
  canEdit: false,
  loading: false,
  initialData: null,
  pick: () => null,
  reset: () => null,
  formData: defaultFormData,
  updateFormData: () => null,
  resetFormData: () => null,
  currentBarSize: -1,
})
export const usePickSnippet = () => useContext(Context)

export const PickSnippetProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const isAddRoute = pathname.search(/\/groove\/new$/) > 0
  const { user, userData, config } = useAuth()
  const [initialData, setInitialData] =
    useState<PickSnippetContext['initialData']>(null)
  const [loading, setLoading] = useState(!isAddRoute)
  const [canEdit, setCanEdit] = useState(false)
  const [formData, setFormData] =
    useState<PickSnippetContext['formData']>(defaultFormData)

  const pick = async (id: string) => {
    setLoading(true)
    try {
      const snippet = await getSnippet(id)
      const data = { id, ...snippet }
      setInitialData(data)
      setFormData({
        ...defaultFormData,
        ...data,
        patterns: {
          ...defaultFormData.patterns,
          ...data?.patterns,
        },
      })
      if (data.authorUid === user?.uid || userData?.isAdmin) {
        setCanEdit(true)
      }
    } catch (error) {
      setInitialData(null)
      router.push('/foladmin')
    }
    setLoading(false)
  }

  useEffect(() => {
    if (isAddRoute) {
      return
    }

    const index = pathname.search(/\/groove\/(.+)$/)
    if (index > 0) {
      const idFromUrl = pathname.substring(index + 8)
      pick(idFromUrl)
      console.log('eff', pathname, loading)
    } else {
      reset()
    }
  }, [pathname])

  useEffect(() => {
    setCanEdit(userData?.isAdmin ?? false)
  }, [userData])

  const updateFormData = (partial: Partial<FormData>) =>
    setFormData({
      ...defaultFormData,
      ...formData,
      ...partial,
      patterns: {
        ...defaultFormData.patterns,
        ...formData.patterns,
        ...(partial?.['patterns'] ?? {}),
      },
    })

  const resetFormData = () => {
    setFormData(defaultFormData)
  }

  const reset = () => {
    setInitialData(null)
    resetFormData()
  }

  const len = Object.values(formData.patterns).find(Boolean)?.length ?? 0
  const currentBarSize = 2 * (len % 3 === 0 ? 3 : len % 4 === 0 ? 4 : 0)

  return (
    <Context.Provider
      value={{
        initialData,
        canEdit,
        pick,
        reset,
        loading,
        formData,
        updateFormData,
        resetFormData,
        currentBarSize: len > 2 && len >= currentBarSize ? currentBarSize : -2,
      }}
    >
      {children}
    </Context.Provider>
  )
}
