'use client'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from 'lz-string'
import { Snippet } from '@/features//SnippetApi'

const defaultData: Partial<Snippet> = {
  swing: '-->',
  tempo: '110',
  signal: 'f-tt-t-tt-t-t---',
  patterns: {
    bell: 'x-x-x-x-x-x-x-xx',
    djembe: 'b-ssb-ss--tsttss',
    dundunba: 'o-----o-o-----o-o-----o-o-----oo',
    sangban: 'x---x---x-o-o---x-oo-o--x-o-o---',
    kenkeni: 'o---o---',
  },
}

const formValidRegexp =
  /swing|tempo|signal|patterns|dundunba|sangban|kenkeni|kenkeni2|bell|djembe|"[btsfxo-]+"|"\d{2,3}"|[<>-]{2,3}|[:,"{}]/g

const validateUrlSeed = (decodedString: string) =>
  decodedString.replaceAll(formValidRegexp, '').length === 0

const getSnippetFromUrl = (encodedString: string) => {
  const decodedString = decompressFromEncodedURIComponent(encodedString)
  if (validateUrlSeed(decodedString)) {
    return JSON.parse(decodedString) || {}
  }
}

const QUERY_PARAM = 'q'

const isDataEqual = (data: Partial<Snippet>, data2: Partial<Snippet>) =>
  data.swing === data2.swing &&
  data.tempo === data2.tempo &&
  data.signal === data2.signal &&
  data.patterns?.bell === data2.patterns?.bell &&
  data.patterns?.djembe === data2.patterns?.djembe &&
  data.patterns?.dundunba === data2.patterns?.dundunba &&
  data.patterns?.sangban === data2.patterns?.sangban &&
  data.patterns?.kenkeni === data2.patterns?.kenkeni &&
  data.patterns?.kenkeni2 === data2.patterns?.kenkeni2

const shallowReduce = <T>(data?: T) =>
  data
    ? (Object.keys(data).reduce((acc, currentKey) => {
        const value = data[currentKey as keyof typeof data]
        return value ? { ...acc, [currentKey]: value } : acc
      }, {}) as Partial<T>)
    : {}

const createQueryString = (data: Partial<Snippet>) => {
  const params = new URLSearchParams()
  const reducedData = shallowReduce(data)
  if ('patterns' in reducedData) {
    reducedData.patterns = shallowReduce(data?.patterns)
  }

  if (isDataEqual(defaultData, reducedData)) {
    params.has(QUERY_PARAM) && params.delete(QUERY_PARAM)
  } else {
    const lz = compressToEncodedURIComponent(JSON.stringify(reducedData))
    params.set(QUERY_PARAM, lz)
  }

  return params.toString()
}

export const usePlayground = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [dataSeed, setDataSeed] = useState<Partial<Snippet>>()

  useEffect(() => {
    try {
      const urlSnippet = searchParams.has(QUERY_PARAM)
        ? getSnippetFromUrl(searchParams.get(QUERY_PARAM)!)
        : null
      setDataSeed(urlSnippet || defaultData)
    } catch (error) {
      router.push('/playground', { scroll: false })
    }
  }, [])

  const searchQuery = searchParams.has('search')
    ? `q=${searchParams.get('search')}`
    : ''

  return {
    dataSeed,
    onChange: (data: Partial<Snippet>) =>
      router.push(`/playground?${createQueryString(data)}${searchQuery}`, {
        scroll: false,
      }),
  }
}
