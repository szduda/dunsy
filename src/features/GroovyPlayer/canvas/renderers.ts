import { font } from './drumFont'
import { CanvasElement } from '../types'

export const BAR_GAP_PX = 5

export const colors = {
  b0: '#121211',
  b1: '#141414',
  b2: '#1f1f1f',

  w0: '#666',
  w1: '#afafaf',
  w2: '#d4d4d4',

  g0: '#131',
  g1: '#242',
}

type RendererArgs = {
  instrument: string
  noteEl: Required<CanvasElement>
  context: CanvasRenderingContext2D
}

const renderChar = ({ instrument, noteEl, context }: RendererArgs) =>
  font[instrument]?.[noteEl.note]?.(context, noteEl, noteEl.bgColor)

export const renderNote = ({ instrument, noteEl, context }: RendererArgs) => {
  context.fillStyle = noteEl.bgColor
  context.fillRect(noteEl.left, noteEl.top, noteEl.width, noteEl.height)

  renderChar({ instrument, noteEl, context })
}

type BarRendererArgs = {
  bars: string[]
  instrument: string
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  large?: boolean
  barIndex?: number
  barsPerRow?: number
  highlighted?: boolean
}

export const renderBar = ({
  bars,
  instrument,
  canvas,
  context,
  large = true,
  barIndex = 0,
  barsPerRow = 2,
  highlighted = false,
}: BarRendererArgs) => {
  const bar = bars[barIndex]
  const noteHeight = large ? 40 : 25
  const barHeightGross = noteHeight + 2 * BAR_GAP_PX
  const barWidth =
    (canvas.clientWidth - (barsPerRow - 1) * BAR_GAP_PX) / barsPerRow

  const noteWidth = barWidth / bar.length

  const top = Math.trunc(barIndex / barsPerRow) * barHeightGross
  const barLeft = (barIndex % barsPerRow) * (barWidth + BAR_GAP_PX)

  const barEl: CanvasElement = {
    type: 'bar',
    bgColor: highlighted ? colors.g0 : colors.b1,
    width: barWidth,
    height: noteHeight,
    top,
    left: barLeft,
    barIndex,
  }

  // Render bar
  context.fillStyle = barEl.bgColor
  context.fillRect(barEl.left, barEl.top, barEl.width, barEl.height)

  // Render notes
  const noteElements = [...bar].map((note, noteIndex) => {
    const isOnBeat = (
      bar.length % 6 === 0 ? [0, 3] : bar.length % 9 === 0 ? [0, 3, 6] : [0, 4]
    ).includes(noteIndex)

    const noteEl: Required<CanvasElement> = {
      type: 'note',
      colour: note === '-' ? colors.w0 : colors.w2,
      bgColor: isOnBeat
        ? highlighted
          ? colors.g1
          : colors.b2
        : highlighted
          ? colors.g0
          : colors.b1,
      width: noteWidth,
      height: noteHeight,
      top,
      left: barLeft + noteIndex * noteWidth,
      note,
      barIndex,
      noteIndex,
    }

    renderNote({ instrument, noteEl, context })

    return noteEl
  })

  return [barEl, ...noteElements]
}
