import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { TopScrollGuard } from '@/features'
import { Bars, Button, Legend, TextLink } from '@/features/rsc'
import {
  GearIcon,
  PepperIcon,
  SearchIcon,
  ShekereIcon,
  SignalIcon,
  SoundHalfIcon,
  SoundHighIcon,
  SoundLowIcon,
  SoundMidIcon,
} from '@/features/Icons'

const HelpPage: FC = () => (
  <main className='flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[1024px]'>
    <TopScrollGuard top={0} />

    <div className='px-12 py-6 mb-12 bg-blacky/25 rounded-md'>
      <h3 className='font-bold text-lg mb-2'>
        About dunsy<small>.app</small>
      </h3>
      <p className='mb-2 leading-relaxed font-medium'>
        This is an open source project - you can access the code at&nbsp;
        <TextLink href='http://szduda.github.com/dunsy'>
          dunsy GitHub repository
        </TextLink>
        .<br />
        The core of this website - the GroovyPlayer - is built with&nbsp;
        <TextLink href='https://github.com/surikov/midi-sounds-react'>
          MIDISounds
        </TextLink>
        &nbsp;&&nbsp;
        <TextLink href='https://github.com/surikov/webaudiofont'>
          WebAudioFont
        </TextLink>
        &nbsp; libraries.
      </p>
      <p className='leading-relaxed font-medium'>
        This is currently a one man project. If by any chance you would like to
        help building dunsy and you are familiar with web development -&nbsp;
        <TextLink href='#'>message me</TextLink>
        &nbsp;any time. If you want to contribute your drumming talents or
        whatever else from the muggle-in-the-software world - that would also be
        appreciated.
      </p>
    </div>

    <h2 className='text-4xl tracking-wider text-greeny mt-12 mb-8 drop-shadow-lg'>
      Website Features
    </h2>
    <Legend
      title='Search'
      description={
        <p>
          Search by tag or rhythm name: e.g. <i>konkoba</i>, <i>9/8</i>,{' '}
          <i>break</i>, or use it as navigation and type <i>all</i>, <i>help</i>{' '}
          or <i>story</i>. If you don&rsquo;t know what to search for you can{' '}
          <TextLink href='/grooves' scroll={false}>
            browse all rhythms
          </TextLink>{' '}
          at the grooves page.
        </p>
      }
      icon={<SearchIcon className='w-24 h-24 fill-whitey' />}
    />
    <h2 className='text-4xl tracking-wider text-yellowy mt-48 mb-8 drop-shadow-lg'>
      Player Features
    </h2>
    <Legend
      title='Play Djembe Signal'
      description={
        <>
          Press the button and you will eventually hear the djembe call. I
          promise, just give it some time. Some rhythms have their unique signal
          patterns, for the rest it will be one of 3 default calls.
          <div className='w-fit grid my-4 gap-2 w-full'>
            <div className='flex'>
              <Bars
                large
                id='4/4 call'
                bars={['f-tt-t-t', 't-t-t---']}
                instrument='djembe'
              />
            </div>
            <div className='flex'>
              <Bars
                large
                id='6/8 call'
                bars={['f-tt-t', 't-tt--']}
                instrument='djembe'
              />
            </div>
            <div className='flex'>
              <Bars
                large
                id='6/4 alternative call'
                bars={['ttttt-', 'tt-t--']}
                instrument='djembe'
              />{' '}
            </div>
          </div>
          <p>
            The last pattern should start with a roll, but rolls are not yet
            implemented in the app.
          </p>
        </>
      }
      icon={
        <SignalIcon
          className='w-24 h-24'
          innerClass2='animate-ping origin-center'
        />
      }
    />

    <Legend
      title='Shekere Pulse'
      description='It will play each pulse. No joke.'
      icon={<ShekereIcon className='w-24 h-24 hover:animate-shake' />}
    />

    <Legend
      title={<span className='text-redy'>Paprika Afreaka Spice</span>}
      description='Groove it up. Apply swing, sometimes swong.'
      icon={<PepperIcon className='w-24 h-24 hover:animate-spin' />}
    />

    <Legend
      title='Mute Track'
      description='It&rsquo;s ticked - you hear the track. It&rsquo;s empty - you don&rsquo;t.'
      icon={
        <input
          type='checkbox'
          readOnly
          checked={true}
          className='w-24 h-24 hover:animate-dundun'
        />
      }
    />

    <Legend
      title='Player Settings'
      description={
        <p>
          Inside you can increse the size of the bars (the player will display
          less bars per line) or turn on the Video Sync, which might be helpful
          if your bluetooth audio device has a delay in reference to the
          highlighted bar.
        </p>
      }
      icon={
        <GearIcon className='w-24 h-24 stroke-graye hover:animate-spin-once' />
      }
    />

    <h2 className='text-4xl tracking-wider text-redy-light mt-48 mb-8 drop-shadow-lg'>
      Drum Notation
    </h2>

    <Legend
      title='Bar & Beats'
      description={
        <p>
          Beats are where you stamp your foot. One bar contains two beats marked
          with a darker background. One beat is followed by 2 or 3 off-beats.
        </p>
      }
      icon={
        <div className='flex flex-col items-center'>
          <Bars large id='' bars={['--------']} instrument='djembe' />
          <div className='w-fit mt-4'>
            <Bars
              large
              id=''
              bars={['------']}
              instrument='djembe'
              activeIndex={0}
            />
          </div>
        </div>
      }
    />

    <Legend
      title='Dundun open / djembe bass'
      description={
        <>
          <p>
            The default sound of dun dun. You play it by striking the drum, then
            letting your hand bounce up right after it touch the skin.
          </p>
          <p className='mt-2'>On the djembe track: bass</p>
        </>
      }
      icon={<SoundLowIcon height={96} />}
    />

    <Legend
      title='Dundun closed / djembe slap'
      description={
        <>
          <p>
            You play that sound by striking the drum and slightly pressing the
            stick against the membrane to mute the sound. Don&rsquo;t press too
            strong. Keep the stick pressed until you need to play the next note.
          </p>
          <p className='mt-2'>On the djembe track: slap</p>
        </>
      }
      icon={<SoundHighIcon height={96} />}
    />

    <Legend
      title='Djembe tone'
      description={
        <>
          <p className='mt-2'>On the djembe track: tone</p>
        </>
      }
      icon={<SoundMidIcon height={96} />}
    />

    <Legend
      title='Bell Sound'
      description={
        <p>Metal hits metal. The first you call a nail, the other a bell.</p>
      }
      icon={<SoundHalfIcon height={96} />}
    />

    <h3 className='text-graye text-3xl drop-shadow-lg mt-48'>
      Need more help?
    </h3>
    <TextLink href='mailto:dunsy.contact@gmail.com' target='_blank'>
      <Button className='mt-8'>Send a message</Button>
    </TextLink>

    <h3 className='text-graye text-3xl drop-shadow-lg mt-48'>App Version</h3>
    <div className='mt-8 pr-4 pl-6 py-4 border border-yellowy-light/25 rounded-full flex items-baseline'>
      <div className='text-2xl'>v0.2</div>
      <div className='bg-yellowy-light/75 font-medium uppercase text-sm rounded-full px-2 py-0.5 ml-3 text-blacky self-center'>
        beta
      </div>
    </div>

    <Legend
      className='pt-48'
      title='Background photo'
      description={
        <p>
          Great people playing drums in the amazing old house. Check out both{' '}
          <TextLink href='https://www.moribaya.pl/?lang=en' target='_blank'>
            Moribaya
          </TextLink>{' '}
          bandpage and{' '}
          <TextLink
            href='https://www.facebook.com/profile.php?id=100064576304359'
            target='_blank'
          >
            Kamionki
          </TextLink>{' '}
          fanpage.
        </p>
      }
      leftCol={
        <Image
          placeholder='blur'
          blurDataURL='fallback.jpeg'
          alt='people playing drums'
          src='/bg_.jpg'
          className='rounded-3xl'
          width={400}
          height={300}
        />
      }
    />
  </main>
)

export default HelpPage
