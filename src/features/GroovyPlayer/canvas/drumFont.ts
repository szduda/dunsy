import { drawCircle, drawCross, drawRing } from './drawing'
import {
  CanvasElement,
  CharsRenderer,
  FontRenderer,
  NoteRenderer,
} from '../types'

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

export const font: FontRenderer = {
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
