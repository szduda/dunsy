import {
  FC,
  FormEvent,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  addSnippet,
  updateSnippet,
  getSnippet,
  Snippet,
} from '@/features/SnippetApi'
import { usePickSnippet } from '@/features/admin'
import {
  DEFAULT_FORM_DATA,
  FormData,
  Mode,
  SWINGS,
  SnippetFormContext,
} from './types'
import { hashify } from '@/utils'
import { User } from '@firebase/auth'

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

export const SnippetFormProvider: FC<{
  children: ReactNode
  dataSeed?: Partial<Snippet>
  onChange?(data: Partial<Snippet>): void
  user?: User | null
}> = (props) => {
  const pickContext = usePickSnippet()
  const initialData = props.dataSeed || pickContext.initialData
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState<Mode>(
    !props.dataSeed && (initialData || pickContext.loading) ? 'read' : 'create'
  )
  const [formData, setFormData] = useState<FormData>({
    ...DEFAULT_FORM_DATA,
    ...props.dataSeed,
    patterns: {
      ...DEFAULT_FORM_DATA.patterns,
      ...props.dataSeed?.patterns,
    },
  })
  const initialHash = useMemo(() => hashify(initialData), [initialData])
  const formHash = hashify(formData)

  useEffect(() => {
    props.onChange?.(formData)
  }, [formHash])

  useEffect(() => {
    setMode(
      !props.dataSeed && (initialData || pickContext.loading)
        ? 'read'
        : 'create'
    )

    setFormData({
      ...DEFAULT_FORM_DATA,
      ...initialData,
      patterns: {
        ...DEFAULT_FORM_DATA.patterns,
        ...initialData?.patterns,
      },
    })
  }, [initialHash, pickContext.loading])

  const len = Object.values(formData.patterns).find(Boolean)?.length ?? 0
  const _currentBarSize = 2 * (len % 3 === 0 ? 3 : len % 4 === 0 ? 4 : 0)
  const x = len > 2 && len >= _currentBarSize ? _currentBarSize : 0
  const currentBarSize = (formData.beatSize ?? 4) * 2 || x

  const updateFormData = (partial: Partial<FormData>) =>
    setFormData((state) => ({
      ...DEFAULT_FORM_DATA,
      ...state,
      ...partial,
      patterns: {
        ...DEFAULT_FORM_DATA.patterns,
        ...state.patterns,
        ...(partial?.['patterns'] ?? {}),
      },
    }))

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
        : await addSnippet({ ...formData, authorUid: props.user?.uid! })
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
    pickContext.pick(initialData.id)
  }

  const memoValue = useMemo(
    () => ({
      handleSubmit,
      loading: busy,
      errors,
      success,
      swings: SWINGS,
      resetForm,
      editAgain,
      dirty: formHash !== initialHash,
      mode,
      setMode,
      formData,
      updateFormData,
      currentBarSize,
    }),
    [pickContext.loading, success, mode, initialHash, formHash, busy]
  )

  return <Context.Provider value={memoValue}>{props.children}</Context.Provider>
}
