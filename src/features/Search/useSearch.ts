import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const useSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')?.trim().toLowerCase() || ''

  const search = (term?: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    if (!term) {
      params.delete('search')
    } else if (term.length > 2) {
      params.set('search', term)
    }

    const query = params ? `?${params}` : ''
    router.push(`${pathname}${query}`, { scroll: false })
  }

  return {
    search,
    searchQuery,
    clearSearch: () => search(''),
  }
}
