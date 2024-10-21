import Image from 'next/image'

export const Loading = () => (
  <main>
    <div className='opacity-50 w-full h-screen text-3xl font-black flex flex-col items-center max-w-screen px-4 mt-8 md:mt-16 tracking-widest text-center overflow-hidden'>
      <div className='relative w-[450px] h-[450px]'>
        <Image
          fill
          sizes='(max-width: 767px) 100%, 450px'
          placeholder='blur'
          blurDataURL='fallback.jpeg'
          className='rounded-lg object-cover object-bottom'
          src={'/hotpot-ai/loader.png'}
          quality={80}
          alt='Dundunin The Guardian'
        />
      </div>
      <div className='mt-8 md:mt-16 pt-1 animate-pulse'>Loading...</div>
    </div>
  </main>
)

export default Loading
