import { FC, useMemo } from 'react'
import { cx } from '@/utils'
import { usePlayerSettings } from './PlayerSettingsContext'
import { BarsCanvas } from './canvas/BarsCanvas'
import { PlayerChangeArgs } from './types'

type Props = {
  title?: string
  pattern?: string
  instrument?: string
  muted?: boolean
  setMuted?(muted: boolean): void
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
  muted,
  setMuted,
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

  return (
    <div
      className={cx([
        'px-1 py-4 lg:px-8 border-b-2 border-graye-darker w-full md:px-4',
        ,
        highlight && 'bg-redy-dark/25',
      ])}
    >
      <label className='mx-1 flex items-center mb-4 w-fit cursor-pointer hover:opacity-75'>
        <input
          name={`mute ${instrument} track`}
          className='mr-3 w-4 cursor-pointer'
          type='checkbox'
          aria-label={`${title} track ${muted ? 'off' : 'on'}`}
          onChange={() => setMuted?.(!muted)}
          checked={!muted}
          disabled={!pattern}
        />
        <div className='text-graye-light'>{title}</div>
      </label>
      <div className={cx(['transition', muted && 'opacity-10'])}>
        {pattern ? (
          <BarsCanvas
            beatSize={beatSize}
            readonly={readonly}
            onChange={onChange}
            large={largeBars}
            bars={bars}
            id={instrument + pattern}
            activeIndex={muted ? undefined : Math.round(beat / 2) - 1}
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
