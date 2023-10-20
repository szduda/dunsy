import { FC, useEffect, useState } from 'react'
import { BellnardNailIcon } from '@/features/Icons'
import { cx } from '@/utils'
import { useAuth } from '../admin'

export const BellnardNail: FC = () => {
  let timeouts: NodeJS.Timeout[] = []
  const [visibility, setVisibility] = useState<
    'hidden' | 'visible' | 'sleeping' | 'shadow'
  >('sleeping')
  const [slide, setSlide] = useState<keyof typeof slides>('')
  const { userData } = useAuth()

  useEffect(() => {
    const handler = () => {}
    addEventListener('scroll', handler)
    return () => {
      removeEventListener('scroll', handler)
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [])

  if (visibility === 'hidden') {
    return null
  }

  const slides = {
    '': (
      <>
        Ohhhh hello! Sorry, I didn&rsquo;t hear you come in. You must be the
        famous <span className='font-semibold'>{userData?.name ?? 'Anonady Moussa'}</span>, I was expecting you.
      </>
    ),
    intro: (
      <div className='grid gap-y-2'>
        <div>
          My name is Bellnard Nail.
          <br />
          I&rsquo;m a cousin of Paperclip. He told me a funny story about you
          once. I&rsquo;m so glad to finally meet you. Would you like me to
          guide you through the form?
        </div>
        <button
          className='text-greeny-dark hover:bg-greeny/50 rounded-xl p-1'
          onClick={() => setSlide('guide')}
        >
          Yes, please.
        </button>
        <button
          className='text-redy-dark hover:bg-redy/50 rounded-xl p-1'
          onClick={() => setSlide('hide')}
        >
          Please, no.
        </button>
      </div>
    ),
    hide: (
      <div className='grid gap-y-2'>
        <div>Sorry to hear that. Are you sure?</div>
        <button
          className='text-greeny-dark hover:bg-greeny/50 rounded-xl p-1'
          onClick={() => {
            setVisibility('sleeping')
            timeouts.push(setTimeout(() => setSlide(''), 5000))
          }}
        >
          Let&rsquo;s talk next time.
        </button>
        <button
          className='text-redy-dark hover:bg-redy/50 rounded-xl p-1'
          onClick={() => setVisibility('hidden')}
        >
          Be gone forever, monster!
        </button>
      </div>
    ),
    guide: (
      <div className='grid gap-y-2'>
        Yay! Let&rsquo;s go. Would you like me to lead you or rather follow
        wherever you decide to go?
        <button
          className='text-greeny-dark hover:bg-greeny/50 rounded-xl p-1'
          onClick={() => {
            setSlide('lead')
            timeouts.push(
              setTimeout(() => {
                setSlide('nextDay')
                timeouts.push(setTimeout(() => setVisibility('shadow'), 3000))
              }, 30000)
            )
          }}
        >
          I&rsquo;m so scared, please go first.
        </button>
        <button
          className='text-redy-dark hover:bg-redy/50 rounded-xl p-1'
          onClick={() => {
            setSlide('follow')
            timeouts.push(
              setTimeout(() => {
                setVisibility('shadow')
                timeouts.push(
                  setTimeout(() => {
                    setVisibility('shadow')
                    timeouts.push(setTimeout(() => setSlide('nextDay'), 2000))
                  }, 3000)
                )
              }, 3000)
            )
          }}
        >
          I&rsquo;m the boss - I scroll, you follow.
        </button>
      </div>
    ),
    lead: (
      <>
        Oh dear, no worries.
        <br />
        Take a seat and relax.
        <br /> By the way, this is my first job as a form guide, so wish me
        <span className={cx(['tracking-widest font-medium'])}>&nbsp;luck</span>.
      </>
    ),
    follow: (
      <>
        A truly bold decision, Your Rhytmicity.
        <br />
        Let me humbly wait in your shadow.
      </>
    ),
    nextDay: <>I&rsquo;m not in the mood right now.</>,
  }

  return (
    <div
      className={cx([
        'flex flex-col transition-all duration-[2s] ease-in-out right-4',
        visibility === 'visible'
          ? 'fixed backdrop-blur rounded-xl bottom-[calc(100dvh-520px)] md:bottom-[15%] translate-x-[calc(-50dvw+140px)] md:translate-x-[8px]'
          : 'absolute bottom-[calc(100%-152px)] md:bottom-[calc(100%-182px)] translate-x-[96px] scale-50',
      ])}
      style={{ zIndex: 1000000 }}
    >
      <div
        className={cx([
          'font-comic leading-relaxed shadow-bright min-h-[148px] pt-2 pb-3 px-3 bg-yellowy-light text-browny rounded-xl mb-2 w-[240px] transition origin-top delay-[1500ms]',
          visibility === 'visible' ? 'scale-y-100' : 'scale-y-0',
        ])}
      >
        {slides[slide]}
        <div className='absolute -bottom-[8px] left-[85px] w-4 h-4 bg-yellowy-light rotate-45' />
      </div>
      <BellnardNailIcon
        onClick={() => {
          setVisibility('visible')
          if (slide === '') {
            timeouts.push(setTimeout(() => setSlide('intro'), 9000))
          } else if (slide === 'nextDay') {
            timeouts.push(setTimeout(() => setVisibility('shadow'), 4000))
          }
        }}
        className={cx(['transition duration-500 ease-in-out mt-4'])}
        height={128}
        innerClass={cx([
          'transition duration-500 ease-in-out origin-bottom delay-500',
          visibility === 'visible' ? 'opacity-100' : 'opacity-0',
          (visibility === 'sleeping' || slide === 'nextDay') &&
            'rotate-[35deg] -translate-x-[10px] translate-y-[25px]',
        ])}
        innerClass2={cx([
          'transition duration-[60s] origin-center ease-in-out',
          slide === 'lead' ? 'fill-redy-light scale-[1.04]' : 'fill-yellowy',
        ])}
      />
    </div>
  )
}
