import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGrooves, useSearch } from '@/features'
import { SnippetCard } from '@/features/SnippetApi'

export const useSearchResults = () => {
  const router = useRouter()
  const { clearSearch, searchQuery } = useSearch()
  const [searchResults, setSearchResults] = useState<SnippetCard[] | null>()
  const [loading, setLoading] = useState(Boolean(searchQuery))
  const grooves = useGrooves()

  useEffect(() => {
    if (grooves.loading) {
      return
    }

    if (searchQuery.length < 3) {
      if (searchQuery.length === 0) {
        document.body.classList.remove('overflow-y-hidden')
        clearSearch()
        setLoading(false)
        setTimeout(() => setSearchResults(null), 500)
      }

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
        const snippets = grooves.cards.filter((card) =>
          [card.title, card.slug, ...card.tags].some((prop) =>
            prop.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
        setSearchResults(snippets.slice(0, 100))
        setLoading(false)
      }

      document.body.classList.add('overflow-y-hidden')
      asyncEffect()
    }
  }, [searchQuery, grooves.loading])

  return {
    searchResults,
    loading: grooves.loading || loading,
  }
}
