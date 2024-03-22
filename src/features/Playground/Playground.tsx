'use client'
import { FC } from 'react'
import { SnippetFormProvider, PatternsSection } from '@/features/SnippetForm'
import { SwingStyleInput } from '@/features/SnippetForm/inputs/SwingStyleInput'
import { PepperIcon, SignalIcon } from '@/features/Icons'
import { CallPatternInput } from '../SnippetForm/inputs/CallPatternInput'

export const Playground: FC = () => (
  <div className='w-full flex flex-col'>
    <SnippetFormProvider
      dataSeed={{
        patterns: {
          dundunba: 'o-----o-o-----o-',
          sangban: 'x---x---x-o-o---',
          kenkeni: 'o---o---',
          bell: 'x-xx-xx-x-x-x-x-',
          djembe: 'b-ssb-ss--tsstss',
        },
        swing: '-->',
        signal: 'f-tt-t-tt-t-t---',
      }}
    >
      <PatternsSection title='Playground' />
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
    </SnippetFormProvider>
  </div>
)
