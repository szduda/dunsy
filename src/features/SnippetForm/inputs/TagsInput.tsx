import { FC } from 'react'
import { Input } from '@/features/rsc'
import { useSnippetForm } from '../SnippetFormContext'

export const TagsInput: FC = () => {
  const { mode, formData, updateFormData } = useSnippetForm()

  return (
    <Input
      label='Tags'
      hint='coma-separated | must include meter e.g. 4/4 | min 3 required'
      disabled={mode === 'read'}
      value={formData.tags}
      onChange={(e) =>
        updateFormData({
          tags: e.target.value.toLowerCase(),
        })
      }
    />
  )
}
