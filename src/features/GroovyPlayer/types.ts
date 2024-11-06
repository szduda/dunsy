import { SwingStyle } from '../SnippetApi/types'

export type TTrack = {
  title: string
  pattern: string
  instrument: string
}

export type GroovyPlayerHook = {
  slug: string
  tracks: TTrack[]
  initialMetronome: boolean
  swingStyle: SwingStyle
  initialTempo: number
  signal?: string
  beatSize?: number
}

export type CanvasElement = {
  type: 'note' | 'bar'
  colour?: string
  bgColor: string
  width: number
  height: number
  top: number
  left: number
  note?: string
  barIndex?: number
  noteIndex?: number
}

export type NoteRenderer = (
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  bgColor?: string
) => void
export type CharsRenderer = Record<string, NoteRenderer>
export type FontRenderer = Record<string, CharsRenderer>

export type PlayerChangeArgs = {
  instrument: string
  newPattern: string
}
