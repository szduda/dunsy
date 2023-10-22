import { ChangeEvent, FC, memo } from 'react'
import { Input } from '@/features/rsc'
import { PatternHint } from '../components/PatternHint'
import { vocabularyOk } from '@/features/SnippetApi/validate'
import { useSnippetForm } from '../SnippetFormContext'

type PatternProps = {
  track: string
  label: string
  disabled?: boolean
  currentBarSize: number
  pattern: string
  onChange(e: ChangeEvent<HTMLInputElement>): void
}
export const PatternInputPure: FC<PatternProps> = ({
  track,
  label,
  disabled = false,
  currentBarSize,
  pattern,
  onChange,
}) => {
  const [patternOk, allowedVocabulary] = vocabularyOk(track, pattern)
  console.log(track, 'input')
  return (
    <Input
      disabled={disabled}
      label={label}
      hint={
        <>
          {pattern.length ? (
            <>
              {!patternOk && (
                <>
                  <span className='text-redy-dark'>
                    {allowedVocabulary} only
                  </span>
                  {' | '}
                </>
              )}
              <PatternHint
                pattern={pattern}
                barSize={currentBarSize}
                factor={patternOk}
              />
            </>
          ) : null}
        </>
      }
      value={pattern}
      onChange={onChange}
    />
  )
}

export const MemoPatternInput = memo(
  PatternInputPure,
  (prev, next) =>
    prev.track === next.track &&
    prev.label === next.label &&
    prev.disabled === next.disabled &&
    prev.currentBarSize === next.currentBarSize &&
    prev.pattern === next.pattern
)

export const PatternInput: FC<{ label: string; track: string }> = ({
  label,
  track,
}) => {
  const {
    mode,
    currentBarSize,
    formData: { patterns },
    updateFormData,
  } = useSnippetForm()

  const pattern = patterns[track]
  const disabled = mode === 'read'

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    updateFormData({
      patterns: { ...patterns, [track]: e.target.value.toLowerCase() },
    })

  return (
    <MemoPatternInput
      {...{ track, label, currentBarSize, pattern, onChange, disabled }}
    />
  )
}
