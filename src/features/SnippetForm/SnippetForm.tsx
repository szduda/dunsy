import { FC } from 'react'
import { BellnardNail } from '@/features/admin'
import { SnippetFormProvider } from './SnippetFormContext'
import { PatternsSection } from './inputs/PatternsSection'
import { FormSuccessScreen } from './components/FormSuccessScreen'
import { FormImage } from './components/FormImage'
import { ModeSwitchSection } from './components/ModeSwitchSection'
import { TitleSlugInput } from './inputs/TitleSlugInput'
import { TagsInput } from './inputs/TagsInput'
import { DescriptionInput } from './inputs/DescriptionInput'
import { CallPatternInput } from './inputs/CallPatternInput'
import { SwingStyleInput } from './inputs/SwingStyleInput'
import { Submit } from './components/Submit'
import { TempoInput } from './inputs/TempoInput'

export const SnippetForm: FC = () => (
  <SnippetFormProvider>
    <FormSuccessScreen />
    <BellnardNail />

    <div className='h-fit w-full grid grid-flow-row gap-8'>
      <FormImage />
      <ModeSwitchSection />

      <form className='grid grid-flow-row gap-8'>
        <h2 className='my-24 w-full text-center text-graye text-3xl tracking-wider'>
          Required fields
        </h2>

        <TitleSlugInput />
        <TagsInput />

        <PatternsSection />

        <h2 className='my-12 w-full text-center text-graye text-3xl tracking-wider'>
          Optional fields
        </h2>

        <DescriptionInput />
        <TempoInput />
        <SwingStyleInput />
        <CallPatternInput />

        <Submit />
      </form>
    </div>
  </SnippetFormProvider>
)

export default SnippetForm
