import { FC } from 'react'
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
