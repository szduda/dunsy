import {
  FC,
  FormEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { addSnippet, updateSnippet, getSnippet } from '@/features/SnippetApi'
import { useAuth, usePickSnippet } from '@/features/admin'
import {
  DEFAULT_FORM_DATA,
  FormData,
  Mode,
  SWINGS,
  SnippetFormContext,
} from './types'
import { hashify } from '@/utils'

const Context = createContext<SnippetFormContext>({
  handleSubmit: Promise.resolve,
  loading: false,
  errors: [],
  success: false,
  swings: SWINGS,
  resetForm: () => null,
  editAgain: () => null,
  dirty: false,
  mode: 'create',
  setMode: () => null,
  formData: DEFAULT_FORM_DATA,
  updateFormData: () => null,
  currentBarSize: -1,
})

export const useSnippetForm = () => useContext(Context)

export const SnippetFormProvider: FC<{ children: ReactNode }> = (props) => {
  const { initialData, pick, loading } = usePickSnippet()
  const { user } = useAuth()
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState<Mode>(
    initialData || loading ? 'read' : 'create'
  )
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA)

  useEffect(() => {
    setMode(initialData || loading ? 'read' : 'create')
    if (formData) {
      return
    }

    setFormData({
      ...DEFAULT_FORM_DATA,
      ...initialData,
      patterns: {
        ...DEFAULT_FORM_DATA.patterns,
        ...initialData?.patterns,
      },
    })
  }, [initialData, loading])

  const dirty = hashify(formData) !== hashify(initialData)

  const len = Object.values(formData.patterns).find(Boolean)?.length ?? 0
  const currentBarSize = 2 * (len % 3 === 0 ? 3 : len % 4 === 0 ? 4 : 0)

  const updateFormData = (partial: Partial<FormData>) =>
    setFormData({
      ...DEFAULT_FORM_DATA,
      ...formData,
      ...partial,
      patterns: {
        ...DEFAULT_FORM_DATA.patterns,
        ...formData.patterns,
        ...(partial?.['patterns'] ?? {}),
      },
    })

  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA)
    setBusy(false)
    setSuccess(false)
    setErrors([])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)

    const patternsDirty =
      hashify(formData.patterns) !== hashify(initialData?.patterns)

    try {
      const res = formData.id
        ? await updateSnippet(formData, patternsDirty)
        : await addSnippet({ ...formData, authorUid: user?.uid! })
      if (res.ok) {
        setSuccess(true)
        setErrors([])
      } else {
        setErrors(res.messages)
      }
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setBusy(false)
    }
  }

  const editAgain = async () => {
    if (!initialData?.id) {
      return
    }

    resetForm()
    const refetched = await getSnippet(String(initialData.id))
    const newInitial = { id: initialData.id, ...refetched }
    updateFormData(newInitial)
    pick(initialData.id)
  }

  return (
    <Context.Provider
      {...props}
      value={{
        handleSubmit,
        loading: busy,
        errors,
        success,
        swings: SWINGS,
        resetForm,
        editAgain,
        dirty,
        mode,
        setMode,
        formData,
        updateFormData,
        currentBarSize: len > 2 && len >= currentBarSize ? currentBarSize : -2,
      }}
    />
  )
}
