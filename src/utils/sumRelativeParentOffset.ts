type Offset = {
  top: number
  left: number
}

export const sumRelativeParentOffset = (
  el: HTMLElement,
  offset = { top: 0, left: 0 }
): Offset => {
  if (el.tagName === 'body') {
    return offset
  }

  const parent = el.parentElement

  if (!parent) {
    return offset
  }

  const totalOffset = parent?.classList.contains('relative')
    ? {
        top: parent.offsetTop + offset.top,
        left: parent.offsetLeft + offset.left,
      }
    : offset

  return sumRelativeParentOffset(parent, totalOffset)
}
