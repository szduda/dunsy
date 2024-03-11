import { ComponentProps, FC, Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/features/admin'
import { SnippetCard, getSnippets, publishGroove } from '@/features/SnippetApi'
import { RestartIcon, SoundLowIcon } from '@/features/Icons'
import { useRevalidate } from '../Revalidate/useRevalidate'
import { useGrooves } from '..'

export const GarageMonitor: FC = () => {
  const { userData } = useAuth()
  const { cards } = useGrooves()
  const [snippets, setSnippets] = useState(cards)
  const { revalidate } = useRevalidate()

  const fetchDrafts = async () => {
    const newSnippets = await getSnippets('', {
      limit: 20,
      includeDrafts: true,
    })
    setSnippets(
      newSnippets
        .sort((s1, s2) =>
          (s2.lastModified ?? 0) > (s1.lastModified ?? 0) ? -1 : 1
        )
        .sort((s1, s2) =>
          s2.published === s1.published || s2.published ? -1 : 1
        )
    )
  }

  useEffect(() => {
    if (snippets.length === 0 && cards.length > 0) {
      setSnippets(cards)
    }

    fetchDrafts()
  }, [cards.length])

  if (!userData?.isAdmin) {
    return null
  }

  const now = Date.now()

  const updatePublished = (publishedId: string) => {
    const newSnippets = [...snippets]
    newSnippets.find((newSnippet) => newSnippet.id === publishedId)!.published =
      true
    setSnippets(newSnippets)
  }

  return (
    <div className='md:px-4 py-8 md:mt-4 bg-blacky/80 md:rounded-xl w-full relative'>
      <button onClick={fetchDrafts} className='absolute right-4 px-1 pt-1'>
        Refetch
      </button>
      <h2 className='px-4 w-fit text-yellowy text-xl md:text-center tracking-widest font-black'>
        Garage Monitoring
      </h2>
      <div className='h-[480px] overflow-y-scroll relative mt-4'>
        <table className='w-full'>
          <thead className='bg-blacky sticky top-0 z-10'>
            <tr>
              <TH>...ago</TH>
              <TH colSpan={3}>Fola</TH>
            </tr>
          </thead>
          <tbody>
            <tr className='bg-greeny-light/10'>
              <TD colSpan={2}></TD>
              <TD>Homepage</TD>
              <TD>
                <div className='flex flex-wrap justify-end items-center md:min-w-[200px]'>
                  <button
                    onClick={() => revalidate('/')}
                    className='p-1 md:px-1 md:py-0 opacity-25 hover:opacity-100 hover:underline text-yellowy-light'
                  >
                    <RestartIcon width={24} className='md:hidden' />
                    <span className='hidden md:inline-block'>Revalidate</span>
                  </button>
                </div>
              </TD>
            </tr>
            <tr className='bg-greeny/5'>
              <TD colSpan={2}></TD>
              <TD>Grooves Garage</TD>
              <TD>
                <div className='flex flex-wrap justify-end items-center md:min-w-[200px]'>
                  <button
                    onClick={() => revalidate('grooves')}
                    className='p-1 md:px-1 md:py-0 opacity-25 hover:opacity-100 hover:underline text-yellowy-light'
                  >
                    <RestartIcon width={24} className='md:hidden' />
                    <span className='hidden md:inline-block'>Revalidate</span>
                  </button>
                </div>
              </TD>
            </tr>
            {snippets.map((snippet) => {
              return (
                <Row
                  {...snippet}
                  key={snippet.id}
                  now={now}
                  onPublish={updatePublished}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

type Props = {
  now: number
  onPublish(publishedId: string): void
} & SnippetCard

export const Row: FC<Props> = ({
  id,
  slug,
  published,
  lastModified,
  authorUid,
  title,
  now,
  onPublish,
}) => {
  const { revalidate, response: revalidateResponse } = useRevalidate()

  const ageMin = Math.floor((now - (lastModified ?? now)) / (60 * 1000))
  const ageDays = Math.floor(ageMin / (24 * 60))
  const ageHours = Math.floor(ageMin / 60)
  const age =
    ageDays > 4
      ? `${ageDays} d`
      : ageHours > 0
      ? `${ageHours} h`
      : `${ageMin} min`

  const actions = [
    {
      name: 'publish',
      visible: !published,
      label: (
        <>
          <span className='hidden md:inline-block'>Publish</span>
          <SoundLowIcon width={24} className='md:hidden' />
        </>
      ),
      onClick: () => {
        publishGroove(id)
        onPublish(id)
      },
    },
    {
      name: 'revalidate',
      visible: true,
      onClick: () => {
        revalidate(slug)
      },
      label: (
        <>
          <span className='hidden md:inline-block'>
            {revalidateResponse || 'Revalidate'}
          </span>
          <RestartIcon width={24} className='md:hidden' />
        </>
      ),
    },
  ]

  return (
    <tr className='even:bg-browny/10'>
      <TD title={new Date(lastModified ?? 0).toLocaleString()}>{age}</TD>
      <TD>{authorUid ? `...${authorUid?.slice(-5)}` : ''}</TD>
      <TD>
        <Link
          href={`/foladmin/groove/${id}`}
          target='_blank'
          className='hover:underline'
        >
          {title}
        </Link>
      </TD>
      <TD>
        <div className='flex flex-wrap justify-end items-center md:min-w-[200px]'>
          {actions
            .filter((action) => action.visible)
            .map(({ name, label, onClick }, index) => (
              <Fragment key={name}>
                {index ? <span className='opacity-10'> | </span> : null}
                <button
                  onClick={onClick}
                  className='p-1 md:px-1 md:py-0 opacity-25 hover:opacity-100 hover:underline text-yellowy-light'
                >
                  {label}
                </button>
              </Fragment>
            ))}
        </div>
      </TD>
    </tr>
  )
}

export const TD: FC<ComponentProps<'td'>> = (props) => (
  <td className='px-2 py-1 leading-loose' {...props} />
)
export const TH: FC<ComponentProps<'th'>> = (props) => (
  <th
    className='px-2 py-3 font-semibold border-b border-whitey/5 tracking-widest text-graye/40 text-left'
    {...props}
  />
)
