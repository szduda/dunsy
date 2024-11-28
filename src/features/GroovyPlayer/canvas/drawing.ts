import { CanvasElement } from '../types'

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  radius: number,
  angle?: [number, number]
) => {
  const startAngle = Math.min(360, Math.max(0, angle?.[0] ?? 0))
  const endAngle = Math.min(360, Math.max(0, angle?.[1] ?? 360))
  ctx.fillStyle = el.colour!
  ctx.beginPath()
  ctx.arc(
    el.left + el.width / 2,
    el.top + el.height / 2,
    radius,
    (startAngle / 180) * Math.PI,
    (endAngle / 180) * Math.PI
  )
  ctx.fill()
}

export const drawRing = (
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  radius: number,
  stroke: number,
  bgColor: string,
  angle?: [number, number]
) => {
  const startAngle = Math.min(360, Math.max(0, angle?.[0] ?? 0))
  const endAngle = Math.min(360, Math.max(0, angle?.[1] ?? 360))

  ctx.fillStyle = el.colour!
  ctx.beginPath()
  ctx.arc(
    el.left + el.width / 2,
    el.top + el.height / 2,
    radius,
    (startAngle / 180) * Math.PI,
    (endAngle / 180) * Math.PI
  )
  ctx.fill()

  ctx.fillStyle = bgColor
  ctx.beginPath()
  ctx.arc(
    el.left + el.width / 2,
    el.top + el.height / 2,
    radius - stroke,
    (startAngle / 180) * Math.PI,
    (endAngle / 180) * Math.PI
  )
  ctx.fill()
}

export const drawCross = (
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  radius: number,
  stroke: number
) => {
  ctx.strokeStyle = el.colour!
  ctx.lineWidth = stroke
  ctx.lineCap = 'round'
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
