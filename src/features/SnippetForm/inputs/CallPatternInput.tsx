import { ChangeEvent, FC } from 'react'
import { useSnippetForm } from '../SnippetFormContext'
import { MemoPatternInput } from './PatternInput'

export const CallPatternInput: FC = ({}) => {
  const { mode, currentBarSize, formData, updateFormData } = useSnippetForm()

  const disabled = mode === 'read'

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    updateFormData({
      signal: e.target.value.toLowerCase(),
    })

  return (
    <MemoPatternInput
      {...{
        track: 'djembe',
        label: '(beta) Signal Pattern',
        currentBarSize,
        pattern: formData.signal ?? '',
        onChange,
        disabled,
      }}
    />
  )
}
