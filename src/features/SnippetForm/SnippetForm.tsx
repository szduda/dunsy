import { FC, useMemo } from 'react'
import { BellnardNail, useAuth } from '@/features/admin'
import { SnippetFormProvider, useSnippetForm } from './SnippetFormContext'
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
import Link from 'next/link'

export const SnippetForm: FC = () => {
  const { user } = useAuth()
  const content = useMemo(
    () => (
      <SnippetFormProvider user={user}>
        <FormSuccessScreen />
        <BellnardNail />
        <BackToFoladmin />
        <Form />
      </SnippetFormProvider>
    ),
    [user?.uid]
  )

  return content
}

const Form = () => {
  const { success } = useSnippetForm()
  return success ? null : (
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
  )
}

const BackToFoladmin = () => (
  <Link
    href='/foladmin'
    className='absolute left-4 md:left-16 top-[40px] md:top-[78px]'
  >
    Back
  </Link>
)

export default SnippetForm
