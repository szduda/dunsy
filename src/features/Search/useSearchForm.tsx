import { useState } from 'react'
import { useSearch } from '@/features'
import { useGrooves } from '../Layout/GroovyContext'

export const useSearchForm = () => {
  const { search, searchQuery } = useSearch()

  const { cards } = useGrooves()

  const [term, setTerm] = useState(searchQuery.length > 2 ? searchQuery : '')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const getSuggestions = (_term: string) => {
    if (_term?.length > 1) {
      const newSuggestions = [
        ...new Set(
          cards
            .flatMap((card) => card.tags)
            .filter((tag) => tag.includes(_term))
        ),
      ].sort(byIndexOf(_term))
      setSuggestions(newSuggestions)
    } else if (_term?.length === 1) {
      const newSuggestions = [
        ...new Set(
          cards
            .flatMap((card) => card.tags)
            .filter((tag) => tag.startsWith(_term))
        ),
      ].sort(byTitle)
      setSuggestions(newSuggestions)
    } else {
      setSuggestions([])
    }
  }

  return {
    term,
    suggestions,
    search,
    setTerm: (term: string, options: { updateSuggestions?: boolean } = {}) => {
      setTerm(term || '')
      if (options.updateSuggestions) {
        getSuggestions(term)
      }
    },
  }
}

const byIndexOf = (term: string) => (s1: string, s2: string) => {
  const idx1 = s1.indexOf(term)
  const idx2 = s2.indexOf(term)
  if (idx1 > idx2) {
    return 1
  } else if (idx1 === idx2) {
    return byTitle(s1, s2)
  }
  return -1
}

const byTitle = (s1: string, s2: string) => (s1 > s2 ? 1 : -1)
