import { TopScrollGuard } from '@/features'
import { Button, H2, Paragraph, TextLink } from '@/features/rsc'
import Link from 'next/link'
import { FC } from 'react'

const StoryPage: FC = () => (
  <main className='flex mx-auto flex-col px-3 pt-8 pb-8 max-w-[1024px]'>
    <TopScrollGuard logoLine />
    <h1 className='text-yellowy text-5xl mt-12 font-bold drop-shadow-lg'>
      Our mission is to help young djembefolas grow even if the soil around them
      is dry.
    </h1>
    <H2>Ok, nice... Wait, what?</H2>
    <Paragraph>
      You discover djembe.
      <br />
      You find group classes.
      <br />
      You join the classes.
      <br />
      You start <span className='text-greeny-light'>loving djembe</span>.
    </Paragraph>
    <H2>At some point you think it&rsquo;s time to grow</H2>
    <Paragraph>
      But the growth ain&rsquo;t just happening. You want to practice your
      solos, breaks, unisonos, intros and outros. You need the backing tracks.
      You look for recordings, but all you can find are 200 BPM jams recorded
      with a potato. You barely hear the dun dun voice. And where&rsquo;s the
      pulse anyway? Which beat is the first beat? Wait... did they just change
      the rhythm? Or maybe it&rsquo;s just your mind who changed it for you.
      &rsquo;Hey mind, don&rsquo;t do that&rsquo;. It keeps doing that.
    </Paragraph>
    <Paragraph>
      You start <span className='text-orangey-light'>hating djembe</span>. No -
      just the recordings. And the mind.
    </Paragraph>
    <H2>Then you realize which century you live in</H2>
    <Paragraph>
      Let the modern tech be helpful this one time. You browse the depths of the
      Internet in search for the app that will make you fully prepared to follow
      the path of the fola. But no app is realy satisfactory. None is enough.
      Just a few rhythms? No new content? No customisation? No editing? Too
      simple? Too advanced? Steep learning curve?
    </Paragraph>
    <Paragraph>
      All these apps are really good in fact. And this is just one more. Not
      perfect either. The mobile performance could (and hopefully eventually
      will) be improved. The sound samples could be more authentic. Plenty of
      things could be added or bettered.
    </Paragraph>
    <Paragraph>
      Oh, by the way - in case you have any comments, feel free to{' '}
      <TextLink href='mailto:dunsy.contact@gmail.com' target='_blank'>
        provide your feedback
      </TextLink>
      .
    </Paragraph>
    {/* <Paragraph>
      (more about GroovyPlayer project)
    </Paragraph> */}
    <H2>
      <>I&rsquo;d rather play with the...</>
    </H2>
    <Paragraph>
      People. It&rsquo;s always better to play with people, together. To let
      your tones speak, your slaps laugh, your bases banter. If for any reason
      at any moment you can&rsquo;t play with other people and you still want to
      play djembe or dundun...
    </Paragraph>
    <h3 className='text-greeny text-5xl mt-6 font-bold drop-shadow-lg'>
      Be my guest and enjoy the app.
    </h3>
    <Link href='/grooves' scroll={false}>
      <Button className='mt-8'>Go where all dundunfolas go</Button>
    </Link>
  </main>
)

export default StoryPage
