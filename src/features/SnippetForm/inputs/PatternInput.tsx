import { ChangeEvent, FC } from 'react'
import { Input } from '@/features/rsc'
import { PatternHint } from '../components/PatternHint'
import { vocabularyOk } from '@/features/SnippetApi/validate'
import { useSnippetForm } from '../SnippetFormContext'

type PatternInputPureProps = {
  patternOk: boolean
  allowedVocabulary: string
  label: string
  disabled?: boolean
  currentBarSize: number
  pattern: string
  onChange(e: ChangeEvent<HTMLInputElement>): void
}
export const PatternInputPure: FC<PatternInputPureProps> = ({
  patternOk,
  allowedVocabulary,
  label,
  disabled = false,
  currentBarSize,
  pattern,
  onChange,
}) => {
  return (
    <Input
      disabled={disabled}
      label={label}
      hint={
        pattern.length ? (
          <>
            {!patternOk && (
              <>
                <span className='text-redy-dark'>{allowedVocabulary} only</span>
                {' | '}
              </>
            )}
            <PatternHint
              pattern={pattern}
              barSize={currentBarSize}
              factor={patternOk}
            />
          </>
        ) : null
      }
      value={pattern}
      onChange={onChange}
    />
  )
}

type PatternInputProps = { label: string; track: string }

export const PatternInput: FC<PatternInputProps> = ({ label, track }) => {
  const {
    mode,
    currentBarSize,
    formData: { patterns },
    updateFormData,
  } = useSnippetForm()

  const pattern = patterns[track]
  const [patternOk, allowedVocabulary] = vocabularyOk(track, pattern)

  return (
    <PatternInputPure
      {...{
        label,
        currentBarSize,
        pattern,
        patternOk,
        allowedVocabulary,
        disabled: mode === 'read',
        onChange: (e: ChangeEvent<HTMLInputElement>) =>
          updateFormData({
            patterns: { [track]: e.target.value.toLowerCase() },
          }),
      }}
    />
  )
}
