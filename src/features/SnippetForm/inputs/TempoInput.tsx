import { FC } from 'react'
import { Input } from '@/features/rsc'
import { useSnippetForm } from '../SnippetFormContext'

export const TempoInput: FC = () => {
  const { mode, formData, updateFormData } = useSnippetForm()

  return (
    <Input
      disabled={mode === 'read'}
      label='Tempo'
      hint='80 - 200'
      value={formData.tempo}
      onChange={(e) => updateFormData({ tempo: e.target.value })}
    />
  )
}
