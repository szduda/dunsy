import { GroovyPlayer, Tags, TopScrollGuard } from '@/features'
import { getSnippetBySlug, getSnippets } from '@/features/SnippetApi'
import { ResolvingMetadata } from 'next'
import { FC } from 'react'
import { redirect } from 'next/navigation'
import { RhythmPage } from '@/features/RhythmPage'

type Props = {
  params: {
    slug: string[]
  }
}

const PublishedRhythmPage: FC<Props> = async ({ params }) => {
  const data = await getSnippetBySlug(params.slug[0])

  if (!data?.published) {
    redirect('/not-found')
  }

  return <RhythmPage data={data} />
}

export async function generateStaticParams() {
  const snippets = await getSnippets(undefined, { limit: 1000 })
  return snippets.map(({ slug }) => ({ slug: [slug] }))
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const snippet = await getSnippetBySlug(params.slug[0])

  if (!snippet) {
    return {
      title: 'Page Not Found',
    }
  }

  const parentMeta = await parent
  const title = snippet?.title
    .split(' ')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.substring(1)}`)
    .join(' ')

  const shortDescription = (snippet?.description ?? '').substring(0, 100)
  const description = `${
    shortDescription ? `${shortDescription}... | ` : ''
  }Listen to ${title} groove and enjoy your drumming practice. Wasa wasa!`

  return {
    title: `${title} - ${parentMeta.title?.absolute}`,
    description,
    openGraph: {
      images: ['/og_player.png'],
      description,
    },
  }
}

export default PublishedRhythmPage
