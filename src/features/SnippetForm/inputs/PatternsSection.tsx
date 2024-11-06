import { FC, useState } from 'react'
import { FormPlayer } from './FormPlayer'
import { PatternInput } from './PatternInput'
import { useSnippetForm } from '../SnippetFormContext'
import { Button } from '@/features/Button'

export const PatternsSection: FC<{
  title?: string
  onClear?(): void
  syncPlayerTempo?: boolean
}> = ({ title = 'Patterns', onClear, syncPlayerTempo = false }) => {
  const [inputsVisible, setInputsVisible] = useState(false)
  return (
    <div className='bg-[#0004] md:rounded-lg mt-4 -mx-2 px-2 pt-8 md:-mx-24 md:pt-12 md:px-24'>
      <div className='text-xl pb-4 flex justify-between items-center gap-4'>
        <div className='flex gap-6 items-center'>
          {title?.length > 0 && (
            <h3 className='text-yellowy tracking-wide'>{title}</h3>
          )}
          <Button
            mini
            padding='px-1 py-.5'
            onClick={() => setInputsVisible(!inputsVisible)}
            className='border w-auto bg-greeny! text-sm font-medium opacity-75 hover:opacity-100'
            colorClasses='bg-greeny-dark hover:bg-greeny'
          >
            {`${inputsVisible ? 'Hide' : 'Show'} Classic Editor`}
          </Button>
          {onClear && (
            <Button
              padding='px-1 py-.5'
              mini
              className='border border-whitey text-sm font-medium opacity-75 hover:opacity-100'
              onClick={onClear}
            >
              Clear
            </Button>
          )}
        </div>
        <PatternsSectionHint />
      </div>

      {inputsVisible && (
        <div className='grid grid-flow-row gap-8 mt-4'>
          <PatternInput label='Dundunba' track='dundunba' />
          <PatternInput label='Sangban' track='sangban' />
          <PatternInput label='Kenkeni' track='kenkeni' />
          <PatternInput label='Kenkeni (high)' track='kenkeni2' />
          <PatternInput label='Bell' track='bell' />
          <PatternInput label='Djembe (beta)' track='djembe' />
        </div>
      )}

      <div className='pt-8 lg:pt-12'>
        <div className='-mx-2 w-fill xl:-mx-24'>
          <FormPlayer syncTempo={syncPlayerTempo} />
        </div>
      </div>
    </div>
  )
}

const PatternsSectionHint = () => {
  const { currentBarSize } = useSnippetForm()
  return (
    <div className='pl-4 text-yellowy text-sm text-right'>
      {currentBarSize > 0 ? (
        <div className='flex items-center'>
          <div className='mr-2 opacity-50'>notes in bar:</div>
          <div
            className='bg-black rounded-full w-8 h-8 flex items-center justify-center text-xl cursor-help'
            title='Resolved from your first pattern. All patterns must by divisible by this number.'
          >
            {currentBarSize || '?'}
          </div>
        </div>
      ) : (
        'min 1 pattern required'
      )}
    </div>
  )
}
