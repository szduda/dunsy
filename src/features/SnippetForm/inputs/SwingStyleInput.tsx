import { FC, useEffect } from 'react'
import { RadiosPure } from '@/features/admin'
import { SwingStyle } from '@/features/SnippetApi/types'
import { useSnippetForm } from '../SnippetFormContext'

export const SwingStyleInput: FC = () => {
  const { mode, swings, formData, updateFormData, currentBarSize } =
    useSnippetForm()

  const validSwingKeys: SwingStyle[] =
    currentBarSize === 6 ? ['', '<<', '>>'] : ['', '<', '>', '-->', '<<<']

  const validSwings = (Object.keys(swings) as (keyof typeof swings)[]).reduce(
    (acc, key) =>
      validSwingKeys.includes(key) ? { ...acc, [key]: swings[key] } : acc,
    {}
  )

  const swingStyleMismatch =
    formData.swing && currentBarSize % (formData.swing.length + 1) !== 0
  useEffect(() => {
    if (swingStyleMismatch) {
      updateFormData({ swing: '' })
    }
  }, [swingStyleMismatch])

  return (
    <RadiosPure
      disabled={mode === 'read'}
      label='Swing style'
      name='swing'
      items={validSwings}
      value={formData.swing}
      onChange={(swing) => updateFormData({ swing })}
    />
  )
}
