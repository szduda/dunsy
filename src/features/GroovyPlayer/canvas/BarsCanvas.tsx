'use client'

import { FC, memo, useEffect, useState } from 'react'
import { CanvasElement, PlayerChangeArgs } from '../types'
import {
  BAR_GAP_PX,
  BAR_HEIGHT_LARGE_PX,
  BAR_HEIGHT_PX,
  colors,
  renderBar,
  renderNote,
} from './renderers'
import { font } from './drumFont'
import { useCanvasWidth } from './useCanvasWidth'
import { detectCollision } from './detectCollision'
import { findPatternLength } from './findPatterLength'
import { cx } from '@/utils'
import { Button } from '@/features/Button'

type BarsProps = {
  id: string
  bars: string[]
  large?: boolean
  activeIndex?: number
  instrument: string
  readonly?: boolean
  onChange?(args: PlayerChangeArgs): void
}

export const Bars: FC<BarsProps> = ({
  bars,
  activeIndex = -1,
  large = false,
  instrument,
  readonly = true,
  onChange,
}) => {
  const canvasId = `${instrument}-canvas`
  const canvasWidth = useCanvasWidth({ canvasId })
  const viewportModifier = canvasWidth < 900 ? 0.5 : 1
  const barsPerRow = viewportModifier * (large ? 4 : 8)
  const barsInPattern = Math.max(findPatternLength(bars, 8), barsPerRow)
  const hash = bars.join('')

  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([])

  const renderAll = () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    const context = canvas.getContext('2d')!
    context.fillStyle = colors.b0
    context.fillRect(0, 0, canvas.width, canvas.height)

    // const _bars = bars.slice(0, barsInPattern)
    const elements = bars.map((_, barIndex) =>
      renderBar({
        bars,
        instrument,
        canvas,
        context,
        large,
        barIndex,
        barsPerRow,
      })
    )
    setCanvasElements(elements.flat())
  }

  // paint all bars
  useEffect(renderAll, [hash, canvasId, canvasWidth, large])

  // repaint transitioning bars on beat pulse
  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    const context = canvas.getContext('2d')!

    if (activeIndex < 0) {
      return renderAll()
    }

    const mutual = { canvas, context, bars, large, instrument, barsPerRow }

    if (activeIndex <= bars.length - 1) {
      renderBar({
        ...mutual,
        barIndex: activeIndex,
        highlighted: true,
      })
    }

    const previousIndex = activeIndex === 0 ? bars.length - 1 : activeIndex - 1
    if (previousIndex <= bars.length - 1) {
      renderBar({ ...mutual, barIndex: previousIndex })
    }
  }, [
    instrument,
    barsInPattern > 1 ? activeIndex % barsInPattern : -1,
    barsPerRow,
  ])

  const noteHeight = large ? BAR_HEIGHT_LARGE_PX : BAR_HEIGHT_PX

  return (
    <div className='flex items-end'>
      <canvas
        id={canvasId}
        height={
          (noteHeight + 2 * BAR_GAP_PX) * Math.ceil(barsInPattern / barsPerRow)
        }
        width={canvasWidth}
        className={cx(['bg-blacky h-auto', !readonly && 'cursor-pointer'])}
        onMouseUp={(e) => {
          if (readonly) {
            return
          }

          const { nextElements, currentEl, nextEl } = rollNextNote(e, {
            canvasId,
            canvasElements,
            instrument,
          })
          if ((currentEl?.barIndex ?? -1) > -1 && nextElements) {
            setCanvasElements(nextElements)
            const _bars = [...bars]
            const pattern = [..._bars[currentEl.barIndex!]]
            pattern[nextEl.noteIndex] = nextEl.note
            _bars[currentEl.barIndex!] = pattern.join('')
            console.log(instrument, pattern.join(''))
            onChange?.({ instrument, newPattern: _bars.join('') })
          }
        }}
        onContextMenu={(e) => e.preventDefault()}
      />
      {!readonly && (
        <Button
          onClick={(e) =>
            onChange?.({
              instrument,
              newPattern: hash + Array(bars[0]?.length).fill('-').join(''),
            })
          }
          mini
          circle
          padding='p-1'
          className='w-10 h-10 text-2xl font-black flex items-center justify-center'
        >
          +
        </Button>
      )}
    </div>
  )
}

export const BarsCanvas = memo(
  Bars,
  (prev, next) =>
    prev.id === next.id &&
    prev.activeIndex === next.activeIndex &&
    prev.large === next.large
)

// handle canvas interactions
const rollNextNote = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  props: {
    canvasId: string
    canvasElements: CanvasElement[]
    instrument: string
  }
) => {
  event.preventDefault()
  const canvas = document.getElementById(props.canvasId) as HTMLCanvasElement
  const target = detectCollision(canvas, props.canvasElements, event)
  const leftButtonClicked = event.button === 0

  if (target?.element?.type !== 'note') {
    return {}
  }

  const validNotes = Object.keys(font[props.instrument])
  const validNoteIndex = validNotes.indexOf(target.element.note!)
  const nextNoteIndex =
    validNoteIndex === validNotes.length - 1 ? 0 : validNoteIndex + 1
  const nextEl = {
    ...(target.element as Required<CanvasElement>),
    note: leftButtonClicked ? validNotes[nextNoteIndex] : '-',
  }

  const nextElements = [...props.canvasElements]
  nextElements[target.index] = nextEl
  renderNote({
    instrument: props.instrument,
    el: nextEl,
    context: canvas.getContext('2d')!,
  })

  return { nextElements, currentEl: target.element, nextEl }
}
