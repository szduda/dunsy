import { FC } from 'react'
import slugify from 'slugify'
import Image from 'next/image'
import { BellnardNail, Radios, usePickSnippet } from '@/features/admin'
import { Button, Input } from '@/features/rsc'
import { cx } from '@/utils'
import { useSnippetForm } from './useSnippetForm'
import { PatternsForm } from './PatternsForm'
import { PatternHint } from './PatternHint'
import { FormSuccessScreen } from './FormSuccessScreen'
import { BackButton } from './BackButton'
import { FormErrors } from './FormErrors'
import { SwingStyle } from '../SnippetApi/types'
import { Mode } from './types'

export const SnippetForm: FC = () => {
  const {
    loading,
    errors,
    success,
    handleSubmit,
    swings,
    resetForm,
    editAgain,
    dirty,
    mode,
  } = useSnippetForm()

  const { currentBarSize, formData, updateFormData } = usePickSnippet()

  const validSwingKeys: SwingStyle[] =
    currentBarSize === 6 ? ['', '<<', '>>'] : ['', '<', '>', '-->', '<<<']

  const validSwings = (Object.keys(swings) as (keyof typeof swings)[]).reduce(
    (acc, key) =>
      validSwingKeys.includes(key) ? { ...acc, [key]: swings[key] } : acc,
    {}
  )

  return (
    <>
      {success && <FormSuccessScreen {...{ mode, editAgain, resetForm }} />}
      <BellnardNail />

      <div
        className={cx([
          'h-fit w-full grid grid-flow-row gap-8',
          success && 'hidden',
        ])}
      >
        <BackButton
          href={mode === 'create' ? '/foladmin' : '/foladmin/groove'}
        />
        <FormImage mode={mode} />
        <ModeSwitchSection />

        <form className='grid grid-flow-row gap-8'>
          <h2 className='my-24 w-full text-center text-graye text-3xl tracking-wider'>
            Required fields
          </h2>

          <Input
            disabled={mode === 'read'}
            label='Title'
            value={formData.title}
            hint={mode === 'create' ? 'will change the slug' : ''}
            onChange={(e) =>
              updateFormData(
                mode === 'create'
                  ? {
                      title: e.target.value,
                      slug: slugify(e.target.value, { lower: true }),
                    }
                  : {
                      title: e.target.value,
                    }
              )
            }
          />
          <div className='flex w-full flex-1 items-end'>
            <div className='text-3xl pb-1 pr-1 text-graye'>/</div>
            <div className='flex-1'>
              <Input
                label='Slug'
                hint={
                  mode === 'create'
                    ? 'kebab case | unique | e.g. soli-sangban-variation-2'
                    : "can't touch this"
                }
                defaultValue={formData.slug}
                disabled={mode !== 'create'}
                onChange={(e) =>
                  updateFormData({
                    slug: slugify(e.target.value, { lower: true }),
                  })
                }
              />
            </div>
          </div>
          <Input
            label='Tags'
            hint='coma-separated | must include meter e.g. 4/4 | min 3 required'
            disabled={mode === 'read'}
            value={formData.tags}
            onChange={(e) =>
              updateFormData({
                tags: e.target.value.toLowerCase(),
              })
            }
          />

          <PatternsForm {...formData} disabled={mode === 'read'} />

          <h2 className='my-12 w-full text-center text-graye text-3xl tracking-wider'>
            Optional fields
          </h2>

          <Input
            disabled={mode === 'read'}
            label='Description'
            textarea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
          />

          <Input
            disabled={mode === 'read'}
            label='Tempo'
            hint='80 - 200'
            value={formData.tempo}
            onChange={(e) => updateFormData({ tempo: e.target.value })}
          />

          <Radios
            disabled={mode === 'read'}
            label='Swing style'
            name='swing'
            items={validSwings}
            value={formData.swing}
            onChange={(swing) => updateFormData({ swing })}
          />

          <Input
            disabled={mode === 'read'}
            label='(beta) call pattern'
            hint={
              <>
                <span>open: bts | flam: f</span>
                {formData.signal?.length ? (
                  <>
                    {' | '}
                    <PatternHint
                      pattern={formData.signal}
                      barSize={currentBarSize}
                      factor={/^[btsf-]+$/.test(formData.signal)}
                    />
                  </>
                ) : null}
              </>
            }
            value={formData.signal}
            onChange={(e) => updateFormData({ signal: e.target.value })}
          />

          {mode !== 'read' && (
            <div className='flex flex-col w-full pt-16 items-center'>
              {errors.length > 0 && <FormErrors errors={errors} />}
              <Button
                type='submit'
                disabled={loading || !dirty}
                onClick={handleSubmit}
              >
                {mode === 'create'
                  ? loading
                    ? 'Creating...'
                    : 'Create Groove'
                  : loading
                  ? 'Updating...'
                  : 'Update Groove'}
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default SnippetForm

type _Props = {
  mode: Mode
  canEdit: boolean
  setMode(mode: Mode): void
}

export const ModeSwitchSection: FC = () => {
  const { canEdit } = usePickSnippet()
  const { mode, setMode } = useSnippetForm()
  return mode === 'create' ? null : (
    <div className='mx-auto text-center'>
      <p className='text-xl'>
        You are in{' '}
        <span
          className={cx([
            'uppercase tracking-widest',
            mode === 'read' ? 'text-greeny' : 'text-yellowy',
          ])}
        >
          {mode}
        </span>{' '}
        mode.
      </p>
      {canEdit ? (
        <Button
          className={cx([
            '!transform-none !filter-none mt-6',
            mode === 'read' ? '!border-yellowy/25' : 'border-greeny/25',
          ])}
          onClick={() => setMode(mode === 'read' ? 'update' : 'read')}
          ninja
        >
          Switch to {mode === 'read' ? 'update' : 'read'} mode
        </Button>
      ) : (
        <p className='mt-6'>You can&rsquo;t edit this rhythm.</p>
      )}
    </div>
  )
}

type __Props = {
  mode: Mode
}

export const FormImage: FC<__Props> = ({ mode }) => (
  <div className='mx-auto w-full md:w-1/3 h-[450px] relative'>
    <Image
      fill
      sizes='450'
      quality={80}
      placeholder='blur'
      blurDataURL='/fallback.jpeg'
      alt='The rhythm vault host in person'
      src={
        mode === 'update'
          ? '/godess2.jpeg'
          : mode === 'create'
          ? '/host.jpeg'
          : '/godess.jpeg'
      }
      className='rounded-lg object-cover'
    />
  </div>
)
