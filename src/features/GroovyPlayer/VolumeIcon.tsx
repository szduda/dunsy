import { ComponentProps } from 'react'
import { cx } from '@/utils'
import { SoundLowIcon, DjembeIcon, DundunIcon } from '@/features/Icons'

type Props = {
  instrument: string
  isMuted: boolean
}

export const VolumeIcon = ({ instrument, isMuted }: Props) => {
  // Instrument-based icon selection
  let IconComponent: React.FC<ComponentProps<'svg'>> | null = SoundLowIcon
  let iconProps: ComponentProps<'svg'> = { className: 'w-10 h-10' }

  if (instrument === 'djembe') {
    // Use djembe icon
    IconComponent = DjembeIcon
    iconProps = {
      ...iconProps,
      style: { scale: 1.1, transform: 'translateY(-3px)' },
    }
  } else if (
    instrument === 'dundunba' ||
    instrument === 'sangban' ||
    (instrument && instrument.startsWith('kenkeni'))
  ) {
    // Use dundun icon
    IconComponent = DundunIcon
  } else {
    iconProps = { ...iconProps, style: { scale: 0.5, color: '#F9C926' } }
  }

  // If muted, add grayscale and overlay a slash
  if (isMuted) {
    return (
      <span className='relative inline-block'>
        {IconComponent && (
          <IconComponent
            {...iconProps}
            className={cx(['saturate-0 opacity-50', iconProps.className])}
          />
        )}
        {/* Slash overlay */}
        <svg
          className='absolute left-0 top-0 w-10 h-10 pointer-events-none'
          viewBox='0 0 40 40'
          style={{ zIndex: 2 }}
        >
          <line
            x1='1'
            y1='40'
            x2='40'
            y2='1'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            className='text-graye'
          />
        </svg>
      </span>
    )
  }

  // Not muted: just the icon, no slash, no grayscale
  return <IconComponent {...iconProps} />
}
