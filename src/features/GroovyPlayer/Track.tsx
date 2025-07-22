import { ComponentProps, FC, useMemo } from 'react'
import { cx } from '@/utils'
import { usePlayerSettings } from './PlayerSettingsContext'
import { BarsCanvas } from './canvas/BarsCanvas'
import { PlayerChangeArgs } from './types'
import {
  DjembeIcon,
  DundunIcon,
  SoundLowIcon,
  SoundMidIcon,
} from '@/features/Icons'

type Props = {
  title?: string
  pattern?: string
  instrument?: string
  volume?: number
  setVolume?(volume: number): void
  beat?: number
  highlight?: boolean
  onChange?(args: PlayerChangeArgs): void
  readonly?: boolean
  beatSize?: number
}

export const Track: FC<Props> = ({
  title,
  pattern = '',
  instrument = '',
  volume = 1,
  setVolume,
  beat = -1,
  highlight = false,
  onChange,
  readonly = true,
  beatSize = 4,
}) => {
  const bars = useMemo(
    () => pattern?.match(RegExp(`.{1,${beatSize * 2}}`, 'g')) ?? [],
    [pattern, beatSize]
  )

  const { largeBars, videoSync } = usePlayerSettings()
  beat = videoSync ? beat - 1 : beat

  const isMuted = volume === 0
  const handleMuteToggle = () => {
    if (isMuted) {
      setVolume?.(1)
    } else {
      setVolume?.(0)
    }
  }

  const getVolumeIcon = () => {
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
      iconProps = { ...iconProps, style: { scale: 0.5 } }
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

  return (
    <div
      className={cx([
        'px-1 py-4 lg:py-8 lg:px-8 border-b-2 border-graye-darker w-full md:px-4 flex flex-col gap-4',
        ,
        highlight && 'bg-redy-dark/25',
      ])}
    >
      <div className='mx-1 flex items-center mb-4 gap-3'>
        <div className='flex items-center gap-2 md:gap-8 cursor-pointer hover:opacity-75'>
          <button
            onClick={handleMuteToggle}
            className='text-graye-light hover:opacity-75 transition-opacity flex items-center gap-2'
            aria-label={`${isMuted ? 'unmute' : 'mute'} ${title} track`}
            disabled={!pattern}
          >
            {getVolumeIcon()}
            <div className='text-graye-light text-xl'>{title}</div>
          </button>
          <input
            disabled={!pattern}
            type='range'
            min='0'
            max='1'
            step='0.01'
            value={volume}
            onChange={(e) => setVolume?.(parseFloat(e.target.value))}
            className='w-20 h-3 rounded-lg appearance-none cursor-pointer slider py-.5'
            style={{
              background: `linear-gradient(to right, #e5e7ebaa 0%, #e5e7ebaa ${volume * 100}%, #374151aa ${volume * 100}%, #374151aa 100%)`,
            }}
          />
        </div>
      </div>
      <div className={cx(['transition', isMuted && 'opacity-10'])}>
        {pattern ? (
          <BarsCanvas
            beatSize={beatSize}
            readonly={readonly}
            onChange={onChange}
            large={largeBars}
            bars={bars}
            id={instrument + pattern}
            activeIndex={isMuted ? undefined : Math.round(beat / 2) - 1}
            instrument={instrument}
          />
        ) : (
          <div className='min-h-[48px] flex items-center justify-center text-graye-light'>
            &nbsp;
          </div>
        )}
      </div>
    </div>
  )
}
