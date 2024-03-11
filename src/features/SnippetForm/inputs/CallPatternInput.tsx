import { ChangeEvent, FC } from 'react'
import { useSnippetForm } from '../SnippetFormContext'
import { PatternInputPure } from './PatternInput'
import { vocabularyOk } from '@/features/SnippetApi/validate'

export const CallPatternInput: FC = ({}) => {
  const { mode, currentBarSize, formData, updateFormData } = useSnippetForm()
  const pattern = formData.signal ?? ''
  const [patternOk, allowedVocabulary] = vocabularyOk('djembe', pattern)

  return (
    <PatternInputPure
      {...{
        track: 'djembe',
        label: '(beta) Signal Pattern',
        currentBarSize,
        patternOk,
        allowedVocabulary,
        pattern,
        disabled: mode === 'read',
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          updateFormData({
            signal: e.target.value.toLowerCase(),
          }),
      }}
    />
  )
}
