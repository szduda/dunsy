import { FormEvent } from 'react'
import { Snippet, SwingStyle } from '../SnippetApi/types'

export const SWINGS: Record<SwingStyle, string> = {
  '': 'none',
  '<': 'hasty',
  '<<<': 'rushy',
  '<<': 'hasty',
  '-->': 'lil lazy',
  '>>': 'lazy',
  '>': 'bluesy',
} as const

export type FormData = typeof DEFAULT_FORM_DATA
export const DEFAULT_FORM_DATA: Snippet = {
  id: '',
  slug: '',
  authorUid: '',
  title: '',
  description: '',
  tags: '',
  swing: '',
  tempo: '110',
  signal: '',
  beatSize: 4,
  patterns: {
    dundunba: '--------',
    sangban: '--------',
    kenkeni: '--------',
    kenkeni2: '--------',
    bell: '--------',
    djembe: '--------',
  },
}

export type Mode = 'create' | 'read' | 'update'

export type SnippetFormContext = {
  handleSubmit(e: FormEvent): Promise<void>
  loading: boolean
  errors: string[]
  success: boolean
  swings: Record<SwingStyle, string>
  resetForm(): void
  editAgain(): void
  dirty: boolean
  mode: Mode
  setMode(mode: Mode): void
  formData: FormData
  updateFormData(data: Partial<FormData>): void
  currentBarSize: number
}

export type PickSnippetContext = {
  canEdit: boolean
  loading: boolean
  initialData: Partial<FormData> | null
  pick(id: string): void
  resetPick(): void
}
