import { cx } from '@/utils'
import { ComponentProps, FC, ReactNode } from 'react'

type Props = {
  mini?: boolean
  label?: ReactNode
  hint?: ReactNode
  className?: string
  black?: boolean
} & (InputProps | TextareaProps)

type InputProps = {
  textarea?: false
} & ComponentProps<'input'>

type TextareaProps = {
  textarea: true
} & ComponentProps<'textarea'>

export const Input: FC<Props> = ({
  mini = false,
  black = false,
  label,
  hint,
  className,
  textarea = false,
  ...inputProps
}) => {
  const inputClasses = cx([
    'border size-16 text-lg tracking-wide p-2 rounded-md focus:outline-none transition-all ease-in-out',
    black
      ? 'bg-blacky text-whitey border-graye-darker hover:border-graye-dark focus:border-graye py-3'
      : 'bg-greeny-darker text-whitey border-graye-dark hover:border-graye focus:border-graye-light',
    !mini && 'w-full',
    !inputProps.value && 'opacity-50',
    className,
  ])

  return (
    <label>
      {(label || hint) && (
        <div className='flex justify-between'>
          <div className='text-graye text-sm font-semibold tracking-wider mb-2 uppercase'>
            {label}
          </div>
          {hint && !inputProps.disabled && (
            <div className='text-yellowy/50 text-sm ml-2 mb-2 text-right'>
              {hint}
            </div>
          )}
        </div>
      )}
      {textarea ? (
        <textarea
          className={inputClasses}
          name={
            inputProps.name ?? typeof label === 'string' ? String(label) : ''
          }
          {...(inputProps as ComponentProps<'textarea'>)}
        />
      ) : (
        <input
          className={inputClasses}
          type='text'
          name={
            inputProps.name ?? typeof label === 'string' ? String(label) : ''
          }
          {...(inputProps as ComponentProps<'input'>)}
        />
      )}
    </label>
  )
}
