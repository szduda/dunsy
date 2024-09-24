import { ComponentProps, FC, Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearch, useSearchResults } from '@/features'
import { Button, Card } from '@/features/rsc'
import { CloseIcon } from '@/features/Icons'
import { cx } from '@/utils'

export const SearchResultsOverlay: FC = () => (
  <Suspense>
    <SearchResultsOverlayClient />
  </Suspense>
)

const SearchResultsOverlayClient: FC = () => {
  const { clearSearch, searchQuery } = useSearch()
  const { searchResults, loading } = useSearchResults()
  const hasResults = Boolean(searchQuery && searchResults?.length)
  const [open, setOpen] = useState(Boolean(searchQuery))

  useEffect(() => {
    setOpen(Boolean(searchQuery))
  }, [searchQuery])

  return (
    <aside
      style={{ zIndex: -1 }}
      className={cx([
        'absolute top-full left-0 right-0 bg-greeny-darker transition-all duration-500 ease-in-out bg-greeny-darker',
        open
          ? 'h-[calc(100dvh-57px)] overflow-y-auto'
          : 'opacity-0 pointer-events-none -translate-y-[82px]',
      ])}
    >
      {(hasResults || loading) && (
        <div className='sticky top-0 bg-greeny-darker px-4 pt-8 md:pt-16 pb-8 tracking-wide text-xl text-graye flex items-center justify-center z-[1]'>
          <div className='flex flex-1 md:flex-none flex-col md:flex-row'>
            {hasResults && (
              <>
                <span className='opacity-75 pr-2 self-baseline'>
                  Search results for
                </span>
                <span className='font-bold text-2xl self-baseline max-w-[480px]'>
                  {searchQuery}
                </span>
              </>
            )}
            {loading && (
              <span className='opacity-75 pr-2 text-2xl self-baseline'>
                let&rsquo;s chill for a sec...
              </span>
            )}
          </div>

          <CloseIconButton
            onClick={() => {
              setOpen(false)
              setTimeout(clearSearch, 500)
            }}
          />
        </div>
      )}
      <div className='pt-8 pb-16 pb-32 px-2 max-w-[1280px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4'>
        {loading &&
          [...new Array(8)].map((_, i) => <Card.Placeholder key={i} i={i} />)}
        {searchResults?.map((card) => <Card key={card.id} {...card} />)}
        {!hasResults && !loading && (
          <div className='col-span-4 flex flex-col items-center text-center md:mt-12'>
            <div className='text-3xl lg:text-4xl text-graye break-all'>
              {searchQuery}?
            </div>
            <div className='mt-6 lg:mt-12 text-lg lg:text-xl'>
              I don&rsquo;t know a rhytm called {searchQuery} yet.
            </div>
            <Link href='/grooves' scroll={false}>
              <Button className='mt-8 lg:mt-16'>Show all tracks</Button>
            </Link>
            <CloseButton onClick={clearSearch} />
          </div>
        )}
      </div>
    </aside>
  )
}

const CloseIconButton: FC<ComponentProps<'button'>> = (props) => (
  <button
    className='ml-4 rounded-full p-1 fill-whitey transition-all hover:scale-110 hover:fill-graye-light'
    {...props}
  >
    <CloseIcon className='lg:w-[40px] h-full' />
  </button>
)

const CloseButton: FC<ComponentProps<'button'>> = (props) => (
  <Button ninja className='mt-4 w-[120px]' {...props}>
    <div className='flex justify-center'>
      <CloseIcon className='fill-whitey mr-2 -ml-2' />
      <span>Close Search</span>
    </div>
  </Button>
)
