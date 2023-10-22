import { FC } from 'react'
import slugify from 'slugify'
import { Input } from '@/features/rsc'
import { useSnippetForm } from '../SnippetFormContext'

export const TitleSlugInput: FC = () => {
  const { mode, formData, updateFormData } = useSnippetForm()
  return (
    <>
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
    </>
  )
}
