import { sumRelativeParentOffset } from '@/utils/sumRelativeParentOffset'
import { CanvasElement } from '../types'

export const detectCollision = (
  canvas: HTMLCanvasElement,
  canvasElements: CanvasElement[],
  event: { pageX: number; pageY: number }
) => {
  const parentOffset = sumRelativeParentOffset(canvas)
  const elemLeft = canvas.offsetLeft + canvas.clientLeft + parentOffset.left
  const elemTop = canvas.offsetTop + canvas.clientTop + parentOffset.top

  var x = event.pageX - elemLeft,
    y = event.pageY - elemTop

  const index = canvasElements.findIndex(
    (element) =>
      element.type === 'note' &&
      y > element.top &&
      y < element.top + element.height &&
      x > element.left &&
      x < element.left + element.width
  )
  const element = canvasElements[index]

  return {
    element,
    index,
  }
}
