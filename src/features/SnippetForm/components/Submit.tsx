import { Button } from '@/features/rsc'
import { FormErrors } from './FormErrors'
import { useSnippetForm } from '../SnippetFormContext'

export const Submit = () => {
  const { mode, loading, errors, handleSubmit, dirty } = useSnippetForm()

  return mode === 'read' ? null : (
    <div className='flex flex-col w-full pt-16 items-center'>
      {errors.length > 0 && <FormErrors errors={errors} />}
      <Button type='submit' disabled={loading || !dirty} onClick={handleSubmit}>
        {mode === 'create'
          ? loading
            ? 'Creating...'
            : 'Create Groove'
          : loading
            ? 'Updating...'
            : 'Update Groove'}
      </Button>
    </div>
  )
}
