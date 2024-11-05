'use client'

import { FC, memo, MouseEventHandler, useEffect, useState } from 'react'
import { CanvasElement } from '../types'
import { BAR_GAP_PX, colors, renderBar, renderNote } from './renderers'
import { font } from './drumFont'
import { useCanvasWidth } from './useCanvasWidth'
import { detectCollision } from './detectCollision'
import { findPatternLength } from './findPatterLength'

type BarsProps = {
  id: string
  bars: string[]
  large?: boolean
  activeIndex?: number
  instrument: string
}

export const Bars: FC<BarsProps> = ({
  bars,
  activeIndex = -1,
  large = false,
  instrument,
}) => {
  const canvasId = `${instrument}-canvas`
  const canvasWidth = useCanvasWidth({ canvasId })
  const viewportModifier = canvasWidth < 900 ? 0.5 : 1
  const barsPerRow = viewportModifier * (large ? 4 : 8)
  const barsInPattern = Math.max(findPatternLength(bars, 8), barsPerRow)
  const hash = bars.join()

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

  // handle canvas interactions
  const rollNextNote: MouseEventHandler<HTMLCanvasElement> = (event) => {
    event.preventDefault()
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    const target = detectCollision(canvas, canvasElements, event)
    const leftButtonClicked = event.button === 0

    if (target?.element?.type !== 'note') {
      return
    }

    const validNotes = Object.keys(font[instrument]).filter(
      (char) => char !== '-'
    )
    const validNoteIndex = validNotes.indexOf(target.element.note!)
    const nextNoteIndex =
      validNoteIndex === validNotes.length - 1 ? 0 : validNoteIndex + 1
    const newNoteEl = {
      ...(target.element as Required<CanvasElement>),
      note: leftButtonClicked ? validNotes[nextNoteIndex] : '-',
    }

    const newElements = [...canvasElements]
    newElements[target.index] = newNoteEl
    renderNote({
      instrument,
      noteEl: newNoteEl,
      context: canvas.getContext('2d')!,
    })
    setCanvasElements(newElements)
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
      onMouseUp={rollNextNote}
      onContextMenu={(e) => e.preventDefault()}
    />
  )
}

export const BarsCanvas = memo(
  Bars,
  (prev, next) =>
    prev.id === next.id &&
    prev.activeIndex === next.activeIndex &&
    prev.large === next.large
)
