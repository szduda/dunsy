import { SwingStyle } from '../SnippetApi/types'

export type TTrack = {
  title: string
  pattern: string
  instrument: string
}

export type GroovyPlayerHook = {
  tracks: TTrack[]
  initialMetronome: boolean
  swingStyle: SwingStyle
  initialTempo: number
  signal?: string
}
