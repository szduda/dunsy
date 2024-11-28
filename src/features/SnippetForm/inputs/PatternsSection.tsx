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
    <div className='bg-[#0004] md:rounded-lg mt-4 -mx-2 px-2 pt-8 md:-mx-8 md:px-8'>
      <div className='text-xl pb-8 flex justify-between items-center gap-4'>
        <div className='flex flex-1 gap-6 items-center'>
          {title?.length > 0 && (
            <h3 className='text-yellowy tracking-wide'>{title}</h3>
          )}
          <Button
            mini
            padding='px-1 py-.5'
            onClick={() => setInputsVisible(!inputsVisible)}
            className='border border-whitey/50 text-nowrap bg-greeny! text-sm font-medium opacity-75 hover:opacity-100'
            colorClasses='bg-greeny-dark hover:bg-greeny'
          >
            {`${inputsVisible ? 'Hide' : 'Show'} Editor`}
          </Button>
          {onClear && (
            <Button
              padding='px-1 py-.5'
              mini
              className='border border-whitey/50 text-sm font-medium opacity-75 hover:opacity-100'
              onClick={onClear}
            >
              Clear
            </Button>
          )}
        </div>
        <PatternsSectionHint />
      </div>

      {inputsVisible && (
        <div className='grid grid-flow-row gap-8 mt-4 mb-12'>
          <PatternInput label='Dundunba' track='dundunba' />
          <PatternInput label='Sangban' track='sangban' />
          <PatternInput label='Kenkeni' track='kenkeni' />
          <PatternInput label='Kenkeni (high)' track='kenkeni2' />
          <PatternInput label='Bell' track='bell' />
          <PatternInput label='Djembe (beta)' track='djembe' />
        </div>
      )}

      <div className='-mx-2 w-fill xl:-mx-8'>
        <FormPlayer syncTempo={syncPlayerTempo} />
      </div>
    </div>
  )
}

const PatternsSectionHint = () => {
  const { currentBarSize, updateFormData } = useSnippetForm()
  return (
    <div className='pl-4 text-yellowy text-sm text-right'>
      {currentBarSize > 0 ? (
        <div className='flex items-center'>
          <div className='mr-2 opacity-50'>grid:</div>
          <button
            className='bg-black rounded-full w-8 h-8 flex items-center justify-center text-xl hover:bg-orangey/50 active:scale-95'
            title='Resolved from your first pattern. All patterns must by divisible by this number.'
            onClick={() =>
              updateFormData({ beatSize: currentBarSize === 8 ? 3 : 4 })
            }
          >
            {currentBarSize || '?'}
          </button>
        </div>
      ) : (
        'min 1 pattern required'
      )}
    </div>
  )
}
