import { FC, useMemo } from 'react'
import { cx } from '@/utils'
import { usePlayerSettings } from './PlayerSettingsContext'
import { BarsCanvas } from './canvas/BarsCanvas'
import { PlayerChangeArgs } from './types'
import { VolumeIcon } from './VolumeIcon'

const generateHash = (text: string) => {
  let hash = 0
  for (const char of text) {
    hash = (hash << 5) - hash + char.charCodeAt(0)
    hash |= 0 // Constrain to 32bit integer
  }
  return hash.toString()
}

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
  beat: _beat = -1,
  highlight = false,
  onChange,
  readonly = true,
  beatSize = 4,
}) => {
  const { largeBars, videoSync } = usePlayerSettings()
  const beat = videoSync ? _beat - 1 : _beat
  const isMuted = volume === 0

  const bars = useMemo(
    () => pattern?.match(RegExp(`.{1,${beatSize * 2}}`, 'g')) ?? [],
    [pattern, beatSize]
  )

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
            onClick={() => setVolume?.(isMuted ? 1 : 0)}
            className='text-graye-light hover:opacity-75 transition-opacity flex items-center gap-2'
            aria-label={`${isMuted ? 'unmute' : 'mute'} ${title} track`}
            disabled={!pattern}
          >
            <VolumeIcon {...{ instrument, isMuted }} />
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
            id={generateHash(pattern)}
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
