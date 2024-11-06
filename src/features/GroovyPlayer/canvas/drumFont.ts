import { drawCircle, drawCross, drawRing } from './drawing'
import {
  CanvasElement,
  CharsRenderer,
  FontRenderer,
  NoteRenderer,
} from '../types'
import { colors } from './renderers'

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
  ctx.strokeStyle = el.colour ?? colors.w2
  ctx.lineWidth = el.width / 4
  ctx.beginPath()
  ctx.moveTo(x, el.top + padding)
  ctx.lineTo(x, el.top + el.height - padding)
  ctx.stroke()
}

type FlamRenderer = (notes: [NoteRenderer, NoteRenderer]) => NoteRenderer

const flamRenderer: FlamRenderer = (notes) => (ctx, el) => {
  const top = el.top - getR(el) / 2
  const left = el.left - getR(el) / 3
  const [leftRenderer, rightRenderer] = notes
  leftRenderer(ctx, { ...el, top, left })
  rightRenderer(ctx, { ...el, top: el.top + 1, left: el.left + 1 })
}

const stFlamRenderer: NoteRenderer = flamRenderer([
  soundHighRenderer,
  soundMidRenderer,
])

const tsFlamRenderer: NoteRenderer = (ctx, el) => {
  soundMidRenderer(ctx, { ...el, top: el.top - 10, left: el.left - 3 })
  soundHighRenderer(ctx, el)
}

const ttFlamRenderer: NoteRenderer = (ctx, el) => {
  soundMidRenderer(ctx, { ...el, top: el.top - 10, left: el.left - 3 })
  soundMidRenderer(ctx, el)
}

const ssFlamRenderer: NoteRenderer = (ctx, el) => {
  soundHighRenderer(ctx, { ...el, top: el.top - 10, left: el.left - 3 })
  soundHighRenderer(ctx, el)
}

const bsFlamRenderer: NoteRenderer = (ctx, el) => {
  soundLowRenderer(ctx, { ...el, top: el.top - 10, left: el.left - 3 })
  soundHighRenderer(ctx, el)
}

const btFlamRenderer: NoteRenderer = (ctx, el) => {
  soundLowRenderer(ctx, { ...el, top: el.top - 10, left: el.left - 3 })
  soundMidRenderer(ctx, el)
}

const xRenderer: NoteRenderer = (ctx, el) =>
  drawCross(ctx, el, getR(el) + 4, getR(el) / 3.5)

const pauseSymbol: CharsRenderer = {
  '-': (ctx, el) =>
    drawCircle(ctx, { ...el, colour: colors.w0 }, el.height / 30),
}
const dundunSymbols: CharsRenderer = {
  ...pauseSymbol,
  o: soundLowRenderer,
  x: soundHighRenderer,
  // i: xRenderer, placeholder for drum shell hit
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
    f: ttFlamRenderer,
    p: ssFlamRenderer,
    l: tsFlamRenderer,
    k: stFlamRenderer,
    g: bsFlamRenderer,
    d: btFlamRenderer,
  },
  bell: {
    ...pauseSymbol,
    x: xRenderer,
  },
  stick: {
    ...pauseSymbol,
    x: stickRenderer,
  },
}
