import Image from 'next/image'
import { PickSnippetModal } from '@/features/admin'

const EditPage = () => (
  <main>
    <div className='hidden 2xl:flex justify-between px-12'>
      <div className='w-[450px] h-[450px] relative'>
        <Image
          fill
          sizes='(max-width: 767px) 100%, 450px'
          placeholder='blur'
          blurDataURL='fallback.jpeg'
          className='rounded-lg object-cover object-bottom'
          src={'/hotpot-ai/drumgal.png'}
          quality={80}
          alt='Dundunin The Guardian'
        />
      </div>
      <div className='w-[450px] h-[450px] relative'>
        <Image
          fill
          sizes='(max-width: 767px) 100%, 450px'
          placeholder='blur'
          blurDataURL='fallback.jpeg'
          className='rounded-lg object-cover object-bottom'
          src={'/hotpot-ai/drumgal2.png'}
          quality={80}
          alt='Dundunin The Guardian'
        />
      </div>
    </div>
    <PickSnippetModal />
  </main>
)

export default EditPage
