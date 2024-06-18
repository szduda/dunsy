'use client'
import { FC } from 'react'
import { SnippetFormProvider, PatternsSection } from '@/features/SnippetForm'
import { SwingStyleInput } from '@/features/SnippetForm/inputs/SwingStyleInput'
import { PepperIcon, SignalIcon } from '@/features/Icons'
import { CallPatternInput } from '@/features/SnippetForm/inputs/CallPatternInput'
import { usePlayground } from './usePlayground'
import { useSnippetForm } from '../SnippetForm/SnippetFormContext'

export const Playground: FC = () => {
  const playground = usePlayground()

  return (
    <div className='w-full flex flex-col'>
      <SnippetFormProvider {...playground}>
        <PlaygroundForm />
      </SnippetFormProvider>
    </div>
  )
}

const PlaygroundForm = () => {
  const { resetForm, formData } = useSnippetForm()
  const canClear = Object.values(formData.patterns).some(Boolean)

  return (
    <>
      <PatternsSection
        onClear={canClear ? () => resetForm() : undefined}
        syncPlayerTempo
      />
      <div className='flex flex-col md:flex-row md:gap-24 justify-center'>
        <div className='flex flex-col md:flex-row gap-12 items-center py-12'>
          <SignalIcon className='w-24 h-24' />
          <CallPatternInput />
        </div>
        <div className='flex flex-col md:flex-row gap-12 items-center py-12'>
          <PepperIcon className='w-24 h-24' />
          <SwingStyleInput />
        </div>
      </div>
    </>
  )
}
