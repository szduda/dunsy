import { ComponentProps, FC, memo } from 'react'
import { cx, hashify } from '@/utils'

type Props = {
  label: string
  items: Record<string, unknown>
  value?: string
  onChange(value: any): void
} & Omit<ComponentProps<'input'>, 'value' | 'onChange'>

const RadiosPure: FC<Props> = ({ items, label, value, onChange, ...rest }) => (
  <fieldset>
    {label && (
      <div className='text-graye text-sm font-semibold tracking-wider mb-2 uppercase'>
        {label}
      </div>
    )}
    {Object.keys(items).map((myValue) => (
      <label
        key={myValue}
        className={cx([
          'p-2 mt-2 text-lg flex items-center',
          value !== myValue && 'opacity-50',
        ])}
      >
        <input
          type='radio'
          name={rest.id || rest.name}
          className='w-5 h-5 mr-2'
          checked={value === myValue}
          onChange={(e) => e.target.checked && onChange?.(myValue)}
          {...rest}
        />

        {String(items[myValue])}
      </label>
    ))}
  </fieldset>
)

export const Radios = memo(
  RadiosPure,
  (prev, next) =>
    prev.label === next.label &&
    prev.disabled === next.disabled &&
    prev.value === next.value &&
    hashify(prev.items) === hashify(next.items)
)
