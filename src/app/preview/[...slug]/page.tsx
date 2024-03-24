import { getSnippetBySlug } from '@/features/SnippetApi'
import { FC } from 'react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { RhythmPage } from '@/features/RhythmPage'

type Props = {
  params: {
    slug: string[]
  }
}

const RhythmPreviewPage: FC<Props> = async ({ params }) => {
  const data = await getSnippetBySlug(params.slug[0])

  if (!data) {
    redirect('/not-found')
  }

  if (data.published) {
    return (
      <main className='flex mx-auto flex-col items-center pt-8 max-w-[1024px] min-h-[calc(100dvh-58px)]'>
        <h1 className='text-5xl mx-auto font-black my-12 drop-shadow-lg'>
          This page is already published
        </h1>
        <p className='font-medium text-xl '>
          Visit it at&nbsp;
          <Link
            href={`/${data.slug}`}
            className='text-yellowy underline hover:no-underline'
          >
            dunsy.app/{data.slug}
          </Link>
        </p>
      </main>
    )
  }

  return <RhythmPage data={data} />
}

export default RhythmPreviewPage
