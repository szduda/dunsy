import { GroovyPlayer, Tags, TopScrollGuard } from '@/features'
import { Snippet } from '@/features/SnippetApi/types'
import { FC } from 'react'

export const RhythmPage: FC<{ data: Snippet }> = ({ data }) => (
  <main className='flex mx-auto flex-col items-center pt-8 max-w-[1024px] min-h-[calc(100dvh-58px)]'>
    <TopScrollGuard logoLine />
    <div className='px-2 lg:px-8 w-full md:w-3/4 self-start pt-4 md:pt-8'>
      <Tags tagString={data.tags} />
      <h1 className='w-full text-5xl font-black mt-5 capitalize drop-shadow-lg'>
        {data.title}
      </h1>
      {data.description && (
        <p className='mt-6 md:mt-12 text-graye-light text-lg font-medium'>
          {data.description}
        </p>
      )}
    </div>
    <GroovyPlayer
      signal={data.signal}
      divProps={{ className: 'md:w-full mt-12 md:mt-16 -mx-2' }}
      swingStyle={data.swing}
      beatSize={data.beatSize}
      tempo={data.tempo ? Number(data.tempo) : 110}
      tracks={Object.keys(data.patterns)
        .map((instrument) => ({
          instrument,
          title: instrument,
          pattern: data.patterns[instrument],
        }))
        .filter((track) => Boolean(track.pattern))}
    />
  </main>
)
