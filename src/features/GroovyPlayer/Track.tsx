import { FC, memo, useMemo } from 'react'
import { cx } from '@/utils'
import { usePlayerSettings } from './PlayerSettingsContext'
import { Note } from './Note'

type Props = {
  title?: string
  pattern?: string
  instrument?: string
  muted?: boolean
  setMuted?(muted: boolean): void
  beat?: number
  highlight?: boolean
}

export const Track: FC<Props> = ({
  title,
  pattern = '',
  instrument = '',
  muted,
  setMuted,
  beat = -1,
  highlight = false,
}) => {
  const barSize =
    [6, 8].find((length) => pattern.length % length === 0) ?? pattern.length

  const bars = useMemo(
    () => pattern?.match(RegExp(`.{1,${barSize}}`, 'g')) ?? [],
    [pattern]
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
        <div
          className={cx([
            'grid gap-0.5 gap-y-3 w-full',
            largeBars
              ? 'grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-4 lg:grid-cols-8',
          ])}
        >
          {pattern ? (
            <MemoBars
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
    </div>
  )
}

type BarsProps = {
  id: string
  bars: string[]
  large?: boolean
  activeIndex?: number
  instrument: string
}

const fn = (bars: string[], maxN = 8, n: number = 1): number => {
  if (n > maxN || n < 1 || n > bars.length) {
    return bars.length
  }

  if (n === 1) {
    return bars.some((b) => b !== bars[0]) ? fn(bars, maxN, 2) : 1
  }

  const firstN = bars.slice(0, n).join()
  const restNs = bars
    .map((_, i) =>
      i % n === 0 ? bars.slice(i, Math.min(bars.length, i + n)).join() : null
    )
    .filter(Boolean)

  const allSame = !restNs.some((pattern) => pattern !== firstN)
  return allSame ? n : fn(bars, maxN, n + 1)
}

export const Bars: FC<BarsProps> = ({
  bars,
  activeIndex = -1,
  large = false,
  instrument,
}) => {
  const barsInPattern = fn(bars, 8)
  return bars.slice(0, barsInPattern).map((bar, index) => (
    <div
      key={bar + index}
      className={cx([
        'flex w-full overflow-hidden',
        activeIndex % barsInPattern === index
          ? 'bg-greeny-dark'
          : 'bg-graye-darkest',
        large ? 'rounded-3xl' : 'rounded-2xl',
      ])}
    >
      {[...bar].map((note, noteIndex) => (
        <Note
          instrument={instrument}
          key={noteIndex}
          note={note}
          large={large}
          beat={(bar.length % 6 === 0
            ? [0, 3]
            : bar.length % 9 === 0
              ? [0, 3, 6]
              : [0, 4]
          ).includes(noteIndex)}
        />
      ))}
    </div>
  ))
}

const MemoBars = memo(
  Bars,
  (prev, next) =>
    prev.id === next.id &&
    prev.activeIndex === next.activeIndex &&
    prev.large === next.large
)
