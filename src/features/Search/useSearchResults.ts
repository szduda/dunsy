import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGrooves, useSearch } from '@/features'
import { SnippetCard } from '@/features/SnippetApi'

export const useSearchResults = () => {
  const router = useRouter()
  const { clearSearch, searchQuery } = useSearch()
  const [searchResults, setSearchResults] = useState<SnippetCard[] | null>()
  const { cards } = useGrooves()

  useEffect(() => {
    if (searchQuery.length < 3) {
      document.body.classList.remove('overflow-y-hidden')
      setSearchResults(null)
      clearSearch()
      return
    }

    if (['all', 'grooves', 'groves'].includes(searchQuery)) {
      router.push('/grooves')
    } else if (['help', 'learn', 'contact'].includes(searchQuery)) {
      router.push('/help', { scroll: false })
    } else if (['story', 'about', 'clickbait'].includes(searchQuery)) {
      router.push('/story')
    } else {
      const asyncEffect = async () => {
        const snippets = cards.filter((card) =>
          [card.title, card.slug, ...card.tags].some((prop) =>
            prop.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
        setSearchResults(snippets.slice(0, 100))
      }

      document.body.classList.add('overflow-y-hidden')
      asyncEffect()
    }
  }, [searchQuery])

  return {
    searchResults,
  }
}
