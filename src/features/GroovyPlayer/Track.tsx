'use client'

import {
  FC,
  memo,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { cx } from '@/utils'
import { usePlayerSettings } from './PlayerSettingsContext'
import debounce from 'lodash-es/debounce'

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
  )
}

type BarsProps = {
  id: string
  bars: string[]
  large?: boolean
  activeIndex?: number
  instrument: string
}

const findPatternLength = (bars: string[], maxN = 8, n: number = 1): number => {
  if (n > maxN || n < 1 || n > bars.length) {
    return bars.length
  }

  if (n === 1) {
    return bars.some((b) => b !== bars[0])
      ? findPatternLength(bars, maxN, 2)
      : 1
  }

  const firstN = bars.slice(0, n).join()
  const restNs = bars
    .map((_, i) =>
      i % n === 0 ? bars.slice(i, Math.min(bars.length, i + n)).join() : null
    )
    .filter(Boolean)

  const allSame = !restNs.some((pattern) => pattern !== firstN)
  return allSame ? n : findPatternLength(bars, maxN, n + 1)
}

const BAR_GAP_PX = 5

type CanvasElement = {
  type: 'note' | 'bar'
  colour: string
  bgColor: string
  width: number
  height: number
  top: number
  left: number
  note?: string
  barIndex?: number
  noteIndex?: number
}

type NoteRenderer = (
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  bgColor?: string
) => void
type CharsRenderer = Record<string, NoteRenderer>
type FontRenderer = Record<string, CharsRenderer>

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  radius: number
) => {
  ctx.fillStyle = el.colour
  ctx.beginPath()
  ctx.arc(
    el.left + el.width / 2,
    el.top + el.height / 2,
    radius,
    0,
    2 * Math.PI
  )
  ctx.fill()
}

const drawRing = (
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  radius: number,
  stroke: number,
  bgColor: string
) => {
  ctx.fillStyle = el.colour
  ctx.beginPath()
  ctx.arc(
    el.left + el.width / 2,
    el.top + el.height / 2,
    radius,
    0,
    2 * Math.PI
  )
  ctx.fill()

  ctx.fillStyle = bgColor
  ctx.beginPath()
  ctx.arc(
    el.left + el.width / 2,
    el.top + el.height / 2,
    radius - stroke,
    0,
    2 * Math.PI
  )
  ctx.fill()
}

const drawCross = (
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  radius: number,
  stroke: number
) => {
  ctx.strokeStyle = el.colour
  ctx.lineWidth = stroke
  const x0 = el.left + (el.width - radius) / 2,
    y0 = el.top + (el.height - radius) / 2,
    x1 = el.left + el.width - (el.width - radius) / 2,
    y1 = el.top + el.height - (el.height - radius) / 2

  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.moveTo(x1, y0)
  ctx.lineTo(x0, y1)
  ctx.stroke()
}

const getR = (el: CanvasElement) => {
  const r = Math.min(el.width, el.height) / 2
  const padding = r < 15 ? 1 : 3
  return r - padding
}

const soundLowRenderer: NoteRenderer = (ctx, el) => {
  drawCircle(ctx, el, getR(el))
}
const soundMidRenderer: NoteRenderer = (ctx, el, bgColor = '#111') =>
  drawRing(ctx, el, getR(el), getR(el) / 2.5, bgColor)
const soundHighRenderer: NoteRenderer = (ctx, el, bgColor = '#111') => {
  drawRing(ctx, el, getR(el), getR(el) / 3, bgColor)
  drawCross(ctx, el, getR(el) + 1, getR(el) / 3.5)
}
const stickRenderer: NoteRenderer = (ctx, el) => {
  const x = el.left + el.width / 2
  const padding = el.height < 30 ? 2 : 4
  ctx.strokeStyle = el.colour
  ctx.lineWidth = el.width / 4
  ctx.beginPath()
  ctx.moveTo(x, el.top + padding)
  ctx.lineTo(x, el.top + el.height - padding)
  ctx.stroke()
}

const pauseSymbol: CharsRenderer = {
  '-': (ctx, el) => drawCircle(ctx, el, el.height / 30),
}
const dundunSymbols: CharsRenderer = {
  ...pauseSymbol,
  o: soundLowRenderer,
  x: soundHighRenderer,
  i: soundMidRenderer,
}

const font: FontRenderer = {
  dundunba: dundunSymbols,
  sangban: dundunSymbols,
  kenkeni: dundunSymbols,
  kenkeni2: dundunSymbols,
  djembe: {
    ...pauseSymbol,
    b: soundLowRenderer,
    t: soundMidRenderer,
    s: soundHighRenderer,
    f: stickRenderer,
  },
  bell: {
    ...pauseSymbol,
    x: stickRenderer,
  },
}

const renderChar = (
  instrument: string,
  noteEl: Required<CanvasElement>,
  context: CanvasRenderingContext2D
) => font[instrument]?.[noteEl.note]?.(context, noteEl, noteEl.bgColor)

const renderNote = (
  instrument: string,
  noteEl: Required<CanvasElement>,
  context: CanvasRenderingContext2D
) => {
  context.fillStyle = noteEl.bgColor
  context.fillRect(noteEl.left, noteEl.top, noteEl.width, noteEl.height)

  renderChar(instrument, noteEl, context)
}

const renderBar = (
  bar: string,
  instrument: string,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  large: boolean = true,
  barIndex: number = 0,
  barsPerRow: number = 2,
  highlighted: boolean = false
) => {
  const noteHeight = large ? 40 : 25
  const barHeightGross = noteHeight + 2 * BAR_GAP_PX
  const barWidth =
    (canvas.clientWidth - (barsPerRow - 1) * BAR_GAP_PX) / barsPerRow

  const noteWidth = barWidth / bar.length

  const top = Math.trunc(barIndex / barsPerRow) * barHeightGross
  const barLeft = (barIndex % barsPerRow) * (barWidth + BAR_GAP_PX)

  const barEl: CanvasElement = {
    type: 'bar',
    colour: highlighted ? '#131' : '#1a1a1a',
    bgColor: highlighted ? '#131' : '#1a1a1a',
    width: barWidth,
    height: noteHeight,
    top,
    left: barLeft,
    barIndex,
  }

  // Render bar
  context.fillStyle = barEl.colour
  context.fillRect(barEl.left, barEl.top, barEl.width, barEl.height)

  // Render notes
  const noteElements = [...bar].map((note, noteIndex) => {
    const isOnBeat = (
      bar.length % 6 === 0 ? [0, 3] : bar.length % 9 === 0 ? [0, 3, 6] : [0, 4]
    ).includes(noteIndex)

    const noteEl: Required<CanvasElement> = {
      type: 'note',
      colour: note === '-' ? '#666' : '#d4d4d4',
      bgColor: isOnBeat
        ? highlighted
          ? '#242'
          : '#292929'
        : highlighted
          ? '#131'
          : '#1a1a1a',
      width: noteWidth,
      height: noteHeight,
      top,
      left: barLeft + noteIndex * noteWidth,
      note,
      barIndex,
      noteIndex,
    }

    renderNote(instrument, noteEl, context)

    return noteEl
  })

  return [barEl, ...noteElements]
}

export const Bars: FC<BarsProps> = ({
  bars,
  activeIndex = -1,
  large = false,
  instrument,
}) => {
  const [canvasWidth, setCanvasWidth] = useState(300)
  const [elements, setElements] = useState<CanvasElement[]>([])

  const viewportModifier = canvasWidth < 900 ? 0.5 : 1
  const barsPerRow = viewportModifier * (large ? 4 : 8)
  const barsInPattern = Math.max(findPatternLength(bars, 8), barsPerRow)
  const hash = bars.join()
  const canvasId = `${instrument}-canvas`

  const renderAll = () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#111'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const elements = bars
      .slice(0, barsInPattern)
      .map((bar, barIndex) =>
        renderBar(bar, instrument, canvas, ctx, large, barIndex, barsPerRow)
      )
    setElements(elements.flat())
  }

  // update canvas width
  useEffect(() => {
    const handler = () => {
      setCanvasWidth(
        document.getElementById(canvasId)?.parentElement?.clientWidth ?? 300
      )
    }
    handler()

    const debouncedHandler = debounce(handler, 500)
    window.addEventListener('resize', debouncedHandler)
    return () => window.removeEventListener('resize', debouncedHandler)
  }, [])

  // paint all bars
  useEffect(() => {
    renderAll()
  }, [hash, canvasId, canvasWidth, large])

  // repaint transitioning bars on beat pulse
  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!

    if (activeIndex < 0) {
      return renderAll()
    }

    if (activeIndex <= bars.length - 1) {
      renderBar(
        bars[activeIndex],
        instrument,
        canvas,
        ctx,
        large,
        activeIndex,
        barsPerRow,
        true
      )
    }

    const previousIndex = activeIndex === 0 ? bars.length - 1 : activeIndex - 1
    if (previousIndex <= bars.length - 1) {
      renderBar(
        bars[previousIndex],
        instrument,
        canvas,
        ctx,
        large,
        previousIndex,
        barsPerRow
      )
    }
  }, [
    barsInPattern > 1 ? activeIndex % barsInPattern : -1,
    instrument,
    barsPerRow,
  ])

  const sumRelativeParentOffset = (el: HTMLElement, offset = 0): number => {
    if (el.tagName === 'body') {
      return offset
    }

    const parent = el.parentElement

    if (!parent) {
      return offset
    }

    const newOffset = parent?.classList.contains('relative')
      ? parent.offsetTop + offset
      : offset

    return sumRelativeParentOffset(parent, newOffset)
  }

  const onClick: MouseEventHandler<HTMLCanvasElement> = (event) => {
    event.preventDefault()

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    const parentOffset = sumRelativeParentOffset(canvas)
    const elemLeft = canvas.offsetLeft + canvas.clientLeft
    const elemTop = canvas.offsetTop + canvas.clientTop + parentOffset

    var x = event.pageX - elemLeft,
      y = event.pageY - elemTop

    // Collision detection between clicked offset and element.
    const targetElementIndex = elements.findIndex(
      (element) =>
        element.type === 'note' &&
        y > element.top &&
        y < element.top + element.height &&
        x > element.left &&
        x < element.left + element.width
    )
    const targetNote = elements[targetElementIndex]

    if (targetNote?.type !== 'note') {
      return
    }

    const validNotes = Object.keys(font[instrument]).filter(
      (char) => char !== '-'
    )
    const validNoteIndex = validNotes.indexOf(targetNote.note!)
    const nextNoteIndex =
      validNoteIndex === validNotes.length - 1 ? 0 : validNoteIndex + 1
    const newNoteEl = {
      ...(targetNote as Required<CanvasElement>),
      note: event.button === 0 ? validNotes[nextNoteIndex] : '-',
    }

    const newElements = [...elements]
    newElements[targetElementIndex] = newNoteEl
    renderNote(instrument, newNoteEl, canvas.getContext('2d')!)
    setElements(newElements)
  }

  const noteHeight = large ? 40 : 25

  return (
    <canvas
      id={canvasId}
      height={
        (noteHeight + 2 * BAR_GAP_PX) * Math.ceil(barsInPattern / barsPerRow)
      }
      width={canvasWidth}
      className='bg-blacky h-auto'
      onMouseUp={onClick}
      onContextMenu={(e) => e.preventDefault()}
    />
  )
}

const MemoBars = memo(
  Bars,
  (prev, next) =>
    prev.id === next.id &&
    prev.activeIndex === next.activeIndex &&
    prev.large === next.large
)
