import { FC } from 'react'
import { Input } from '@/features/rsc'
import { useSnippetForm } from '../SnippetFormContext'

export const DescriptionInput: FC = () => {
  const { mode, formData, updateFormData } = useSnippetForm()

  return (
    <Input
      disabled={mode === 'read'}
      label='Description'
      textarea
      value={formData.description}
      onChange={(e) => updateFormData({ description: e.target.value })}
    />
  )
}
