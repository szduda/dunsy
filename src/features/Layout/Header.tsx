import { ComponentProps, FC } from 'react'
import Link from 'next/link'
import { AdminButton, Logo, Search, SearchResultsOverlay } from '@/features'
import { Button } from '@/features/rsc'
import { InfoIcon, LogoIcon } from '@/features/Icons'
import { cx } from '@/utils'

const menu = {
  grooves: 'Rhythms',
  playground: 'Playground',
}

export const Header: FC = () => (
  <header
    className={cx(['sticky -top-[185px] md:-top-[225px]'])}
    style={{ zIndex: 100 }}
  >
    <div
      className={cx([
        'flex justify-center items-center pt-8 md:pt-14 pb-6 md:pb-10 px-4 w-full',
      ])}
    >
      <Logo />
    </div>
    <div className='relative'>
      <nav
        className={cx([
          'flex justify-between items-center px-2 py-2 bg-greeny-darker shadow-md max-w-screen',
        ])}
      >
        <div className='flex md:flex-1 items-center md:w-[64px] h-fit gap-4'>
          <SmallLogo />
          <ul className='hidden lg:flex font-medium tracking-wide'>
            {Object.keys(menu).map((url) => (
              <li key={url}>
                <a
                  className='text-graye-light hover:text-whitey px-5 py-4 flex -my-4 hover:bg-graye-light/5 transition-all ease-in-out'
                  href={`/${url}`}
                >
                  {menu[url as keyof typeof menu]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex items-center pl-2 md:flex-1 w-[180px] md:flex-none md:w-[400px]'>
          <Search />
        </div>
        <div className='flex flex-1 justify-end'>
          <AdminButton />
          <InfoButton className='hidden md:flex' />
        </div>
      </nav>
      <SearchResultsOverlay />
    </div>
  </header>
)

const SmallLogo: FC = () => (
  <Link
    href='/'
    scroll={false}
    className={cx([
      'flex saturate-50 brightness-200 contrast-150 opacity-30 transition-all duration-300',
      'hover:brightness-100 hover:saturate-100 hover:contrast-100 hover:opacity-100',
    ])}
  >
    <LogoIcon height='40' />
  </Link>
)

const InfoButton: FC<Omit<ComponentProps<typeof Link>, 'href'>> = (props) => (
  <Link {...props} href='/help' scroll={false} className='flex'>
    <Button
      mini
      circle
      colorClasses='hover:bg-graye-dark'
      className='ml-1'
      padding='p-2'
      aria-label='help'
    >
      <InfoIcon />
    </Button>
  </Link>
)
