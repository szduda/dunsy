'use client'

import { SwingStyle } from '../SnippetApi/types'

export const applySwing = (
  beats: any,
  beatSize: number,
  swingStyle: SwingStyle
) => {
  if (beatSize % (swingStyle.length + 1) !== 0) {
    console.error(
      `GroovyPlayer: Cannot apply '${swingStyle}' swing to the beat of size ${beatSize}.`
    )
    return beats
  }

  if (!Object.keys(swingFns).includes(swingStyle)) {
    console.error(`GroovyPlayer: Swing style '${swingStyle}' not found.`)
    return beats
  }

  return swingFns[swingStyle]?.(beats)
}

const swing = (notes: any[], emptys: number) => [
  [notes, []],
  ...[...Array(emptys)].map(() => [[], []]),
]

const swingLikeSoli = (beats: any[]) => {
  const swingedBeats: number[][][] = []
  beats.forEach(([notes]: any, noteIndex: number) => {
    if (noteIndex % 3 === 0) swingedBeats.push(...swing(notes, 4))
    else if (noteIndex % 3 === 1) swingedBeats.push(...swing(notes, 5))
    else if (noteIndex % 3 === 2) swingedBeats.push(...swing(notes, 6))
  })
  return swingedBeats
}

const swingLikeTiriba = (beats: any[]) => {
  const swingedBeats: number[][][] = []
  beats.forEach(([notes]: any, noteIndex: number) => {
    if (noteIndex % 3 === 0) swingedBeats.push(...swing(notes, 6))
    else if (noteIndex % 3 === 1) swingedBeats.push(...swing(notes, 4))
    else if (noteIndex % 3 === 2) swingedBeats.push(...swing(notes, 5))
  })
  return swingedBeats
}

const swingLikeMadan = (beats: any[]) => {
  const swingedBeats: number[][][] = []
  beats.forEach(([notes]: any, noteIndex: number) => {
    if (noteIndex % 2 === 0) swingedBeats.push(...swing(notes, 6))
    else if (noteIndex % 2 === 1) swingedBeats.push(...swing(notes, 4))
  })
  return swingedBeats
}

const swingLikeKujwiedon = (beats: any[]) => {
  const swingedBeats: number[][][] = []
  beats.forEach(([notes]: any, noteIndex: number) => {
    if (noteIndex % 2 === 0) swingedBeats.push(...swing(notes, 4))
    else if (noteIndex % 2 === 1) swingedBeats.push(...swing(notes, 6))
  })
  return swingedBeats
}

const swingLikeGnawa = (beats: any[]) => {
  const swingedBeats: number[][][] = []
  beats.forEach(([notes]: any, noteIndex: number) => {
    if (noteIndex % 4 === 0) swingedBeats.push(...swing(notes, 5))
    else if (noteIndex % 4 === 1) swingedBeats.push(...swing(notes, 5))
    else if (noteIndex % 4 === 2) swingedBeats.push(...swing(notes, 6))
    else if (noteIndex % 4 === 3) swingedBeats.push(...swing(notes, 4))
  })
  return swingedBeats
}

const swingLikeSoboninkun = (beats: any) => {
  const swingedBeats: number[][][] = []
  beats.forEach(([notes]: any, noteIndex: number) => {
    if (noteIndex % 4 === 0) swingedBeats.push(...swing(notes, 3))
    else if (noteIndex % 4 === 1) swingedBeats.push(...swing(notes, 5))
    else if (noteIndex % 4 === 2) swingedBeats.push(...swing(notes, 6))
    else if (noteIndex % 4 === 3) swingedBeats.push(...swing(notes, 6))
  })
  return swingedBeats
}

const swingFns: Partial<Record<SwingStyle, Function>> = {
  '<<': swingLikeSoli,
  '>>': swingLikeTiriba,
  '<': swingLikeKujwiedon,
  '>': swingLikeMadan,
  '-->': swingLikeGnawa,
  '<<<': swingLikeSoboninkun,
}
