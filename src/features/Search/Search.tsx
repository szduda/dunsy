import { ComponentProps, FC, KeyboardEvent, Suspense, useState } from 'react'
import { useSearchForm } from '@/features'
import { SearchIcon } from '@/features/Icons'
import { Button } from '@/features/rsc'
import { cx } from '@/utils'

export const Search: FC = () => (
  <Suspense fallback={<SearchFallback />}>
    <ClientSearch />
  </Suspense>
)

const ClientSearch: FC = () => {
  const { suggestions, term, setTerm, submitSearch, search } = useSearchForm()
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)

  const closeSuggestions = () => {
    setSuggestionsOpen(false)
    setSelectedSuggestionIndex(-1)
  }

  const selectWithKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length < 1) {
      return
    }

    const last = suggestions.length - 1
    const isLast = selectedSuggestionIndex === last
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const index =
        selectedSuggestionIndex === 0 ? last : selectedSuggestionIndex - 1
      setTerm(suggestions[index])
      setSelectedSuggestionIndex(index)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const index = isLast ? 0 : selectedSuggestionIndex + 1
      setTerm(suggestions[index])
      setSelectedSuggestionIndex(index)
    } else if (e.key === 'Escape') {
      closeSuggestions()
    }
  }

  return (
    <>
      {suggestionsOpen && (
        <div
          className='fixed top-0 bottom-0 left-0 right-0 animate-fadein bg-yellowy/5'
          onClick={closeSuggestions}
          style={{ zIndex: 10000 }}
        />
      )}
      <form
        className='flex relative w-full'
        onSubmit={(e) => {
          submitSearch(e)
          closeSuggestions()
        }}
      >
        <div className='relative w-full'>
          <SearchInput
            value={term}
            onChange={(e) => {
              setTerm(e.target.value, { updateSuggestions: true })
              setSuggestionsOpen(true)
            }}
            onFocus={() =>
              setSuggestionsOpen(Boolean(term) && suggestions.length > 0)
            }
            onKeyDown={selectWithKeyboard}
          />
          <SearchButton type='submit' className='absolute right-0 top-0' />
        </div>
        {suggestionsOpen && (
          <Suggestions
            suggestions={suggestions}
            selectedIndex={selectedSuggestionIndex}
            onClick={(suggestion) => {
              setTerm(suggestion)
              search(suggestion)
            }}
            onClose={closeSuggestions}
          />
        )}
      </form>
    </>
  )
}

const SearchFallback = () => (
  <div className='flex-1 flex'>
    <SearchInput />
    <SearchButton />
  </div>
)

const Suggestions: FC<{
  suggestions: string[]
  selectedIndex: number
  onClick(term: string): void
  onClose(): void
}> = ({ suggestions, selectedIndex, onClick, onClose }) =>
  suggestions?.length ? (
    <>
      <ul
        className='absolute top-full left-0 right-[46px] rounded-md py-1 overflow-hidden bg-blacky text-whitey'
        style={{ zIndex: 10001 }}
      >
        {suggestions.map((suggestion, index) => (
          <li key={suggestion}>
            <button
              onClick={() => {
                onClick(suggestion)
                onClose()
              }}
              className={cx([
                'py-1 px-1 hover:bg-greeny-dark w-full text-left',
                selectedIndex === index && 'bg-greeny-dark',
              ])}
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
    </>
  ) : null

const SearchInput: FC<ComponentProps<'input'>> = ({ ...props }) => (
  <input
    placeholder='e.g. djansa, 4/4'
    className='w-full placeholder:text-graye bg-greeny-darker min-w-[120px] flex-1 md:flex-0 brightness-125 rounded-md h-[40px] opacity-50 hover:opacity-75 focus:opacity-100 focus:bg-blacky/50 focus:outline-none pl-2 pr-10 py-1 text-whitey'
    {...props}
  />
)

const SearchButton: FC<ComponentProps<typeof Button>> = (props) => (
  <Button
    mini
    circle
    colorClasses='hover:bg-graye-dark'
    className='ml-1'
    padding='p-2'
    aria-label='search'
    {...props}
  >
    <SearchIcon className='fill-whitey' />
  </Button>
)
