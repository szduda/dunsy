import { FormEvent, useEffect, useState } from 'react'
import {
  addSnippet,
  updateSnippet,
  Snippet,
  getSnippet,
} from '@/features/SnippetApi'
import { useAuth, usePickSnippet } from '@/features/admin'
import { SwingStyle } from '../SnippetApi/types'
import { useRevalidate } from '../Revalidate/useRevalidate'
import { Mode } from './types'

const swings: Record<SwingStyle, string> = {
  '': 'none',
  '<': 'hasty',
  '<<<': 'rushy',
  '<<': 'hasty',
  '-->': 'lil lazy',
  '>>': 'lazy',
  '>': 'bluesy',
}

export const useSnippetForm = () => {
  const {
    initialData,
    pick,
    formData,
    resetFormData,
    updateFormData,
    loading,
  } = usePickSnippet()
  const { user } = useAuth()
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState(false)
  const [busy, setBusy] = useState(false)
  const [mode, setMode] = useState<Mode>(
    initialData || loading ? 'read' : 'create'
  )

  useEffect(
    () => setMode(initialData || loading ? 'read' : 'create'),
    [initialData, loading]
  )

  const patternsDirty = Object.keys(formData.patterns).some(
    (instrument) =>
      formData.patterns[instrument] !==
      (initialData?.patterns?.[instrument] || '')
  )

  const dirty = Object.keys(formData).some((field) => {
    const value = formData[field as keyof Snippet]
    // try shallow comparison
    if (value === (initialData?.[field as keyof Snippet] || '')) {
      return false
    }

    if (field === 'patterns') {
      return patternsDirty
    }

    return true
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)

    try {
      const res = formData.id
        ? await updateSnippet(formData, patternsDirty)
        : await addSnippet({ ...formData, authorUid: user?.uid! })
      if (res.ok) {
        setSuccess(true)
        setErrors([])

        // if (mode === 'create') {
        //   revalidate('')
        //   revalidate('grooves')
        //   console.log('Revalidating homepage and /grooves page.')
        // } else if (mode === 'update') {
        //   if (initialData!.slug !== formData.slug) {
        //     revalidate(initialData!.slug)
        //     console.log(`Revalidating /${initialData!.slug}`)
        //   } else {
        //     revalidate(formData.slug)
        //     console.log(`Revalidating /${formData.slug}`)
        //   }
        // }
      } else {
        setErrors(res.messages)
      }
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setBusy(false)
    }
  }

  const resetForm = () => {
    resetFormData()
    setBusy(false)
    setSuccess(false)
    setErrors([])
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

  return {
    handleSubmit,
    loading: busy,
    errors,
    success,
    swings,
    formData,
    updateFormData,
    resetForm,
    editAgain,
    dirty,
    mode,
    setMode,
  } as const
}
