import { ComponentProps, FC, memo, useState } from 'react'
import { PlayerControls } from './PlayerControls'
import { Track } from './Track'
import { useGroovyPlayer } from './useGroovyPlayer'
import { SwingStyle } from '../SnippetApi/types'
import { TTrack } from './types'
import { cx } from '@/utils'
import {
  AVSyncLabel,
  LargeBarsLabel,
  PlayerSettings,
  SettingsButton,
} from './PlayerSettings'
import { PlayerSettingsProvider } from './PlayerSettingsContext'
import { matchSignal } from './notation'

export type Props = ComponentProps<'div'> & {
  tracks: TTrack[]
  swingStyle?: SwingStyle
  signal?: string
  metronome?: boolean
  tempo?: number
}

const GroovyPlayerEngine: FC<Props> = ({
  tracks,
  swingStyle = '',
  signal,
  metronome: initialMetronome = true,
  tempo: initialTempo = 110,
  ...divProps
}) => {
  const { muted, setMuted, loopLength, beat, beatSize, ...rest } =
    useGroovyPlayer({
      tracks,
      initialMetronome,
      initialTempo,
      swingStyle,
      signal,
    })

  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <Wrapper {...divProps}>
      <div
        className={cx([
          'transition-all ease-in-out',
          settingsOpen && 'blur-sm brightness-75 pointer-events-none',
        ])}
      >
        <div className='px-2 md:px-4 lg:px-8 py-4 flex justify-between items-center text-3xl'>
          <div
            className='text-greeny-darker tracking-tighter opacity-50'
            style={{ textShadow: '0 0 2px #000' }}
          >
            GroovyPlayer
          </div>
          <div className='flex'>
            <div className='hidden md:grid grid-cols-2 gap-1'>
              <LargeBarsLabel />
              <AVSyncLabel />
            </div>
            <SettingsButton
              className='md:hidden'
              onClick={() => setSettingsOpen(true)}
            />
          </div>
        </div>
        {tracks.length
          ? tracks.map(({ title, instrument, pattern }, index) => {
              const barSize = 2 * beatSize
              const _signal = matchSignal(beatSize, signal, swingStyle)
              const signalTrack = rest.signalActive && instrument === 'djembe'
              const prolongedSignal =
                '-'.repeat(Math.max(loopLength - _signal?.length, 0)) + _signal
              const excess = pattern.length % barSize
              const _pattern =
                excess > 0 ? pattern + '-'.repeat(barSize - excess) : pattern
              const prolongedPattern = _pattern?.repeat(
                loopLength / _pattern.length
              )

              return (
                <Track
                  key={`${title}${index}`}
                  title={signalTrack ? 'djembe signal' : title}
                  highlight={signalTrack}
                  beat={beat}
                  instrument={instrument}
                  pattern={
                    (rest.signalActive || rest.signalRequested) &&
                    instrument === 'djembe'
                      ? prolongedSignal
                      : prolongedPattern
                  }
                  muted={muted[instrument]}
                  setMuted={(value) =>
                    setMuted({ ...muted, [instrument]: value })
                  }
                />
              )
            })
          : [...Array(3)].map((_, i) => <Track key={`track-${i}`} />)}

        <PlayerControls
          {...{ disabled: !tracks.length, swingStyle, ...rest }}
        />
      </div>
      <PlayerSettings
        onClose={() => setSettingsOpen(false)}
        className={cx([
          'transition ease-in-out duration-300',
          settingsOpen
            ? 'translate-x-0'
            : 'translate-x-16 pointer-events-none opacity-0',
        ])}
      />
    </Wrapper>
  )
}

export const GroovyPlayer = memo(
  GroovyPlayerEngine,
  ({ tracks: prevTracks, ...prev }, { tracks: nextTracks, ...next }) => {
    const propsEqual = Object.keys(prev).every(
      (key) => (next as any)[key] === (prev as any)[key]
    )
    const tracksEqual =
      nextTracks.length === prevTracks.length &&
      nextTracks.every(
        (track, index) => prevTracks?.[index]?.pattern === track.pattern
      )

    return propsEqual && tracksEqual
  }
)

const Wrapper: FC<ComponentProps<'div'>> = ({
  className,
  children,
  ...props
}) => (
  <div
    {...props}
    className={cx([
      'overflow-hidden w-full lg:rounded-lg bg-blacky text-whitey font-bold text-md leading-normal relative',
      className,
    ])}
  >
    <PlayerSettingsProvider>{children}</PlayerSettingsProvider>
  </div>
)
