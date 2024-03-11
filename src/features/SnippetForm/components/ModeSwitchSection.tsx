import { FC, memo } from 'react'
import { usePickSnippet } from '@/features/admin'
import { Button } from '@/features/rsc'
import { cx } from '@/utils'
import { useSnippetForm } from '../SnippetFormContext'
import { Mode } from '../types'

type Props = {
  mode: Mode
  canEdit: boolean
  setMode(mode: Mode): void
}

export const ModeSwitchSectionPure: FC<Props> = ({ mode, canEdit, setMode }) =>
  mode === 'create' ? null : (
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

export const ModeSwitchSectionMemo = memo(
  ModeSwitchSectionPure,
  (prev, next) => prev.mode === next.mode && prev.canEdit === next.canEdit
)

export const ModeSwitchSection: FC = () => {
  const { canEdit } = usePickSnippet()
  const { mode, setMode } = useSnippetForm()

  return <ModeSwitchSectionMemo {...{ canEdit, mode, setMode }} />
}
