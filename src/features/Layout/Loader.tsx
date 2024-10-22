import Image from 'next/image'

export const Loader = () => (
  <div className='flex flex-col items-center justify-center gap-16 px-4 pt-8'>
    <div className='relative w-[450px] h-[450px]'>
      <Image
        fill
        sizes='(max-width: 767px) 100%, 450px'
        placeholder='blur'
        blurDataURL='fallback.jpeg'
        className='rounded-lg object-cover object-bottom opacity-80 animate-pulse'
        src={'/hotpot-ai/loader.png'}
        quality={80}
        alt='Dundara The Loading Mate'
      />
    </div>
    <div className='animate-pulse tracking-widest text-center text-3xl font-black'>
      Loading...
    </div>
  </div>
)
