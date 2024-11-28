import { GroovyPlayer } from '@/features'
import { useSnippetForm } from '../SnippetFormContext'

export const FormPlayer = ({ syncTempo = false }: { syncTempo?: boolean }) => {
  const {
    formData: { patterns, signal, swing, tempo, beatSize },
    updateFormData,
  } = useSnippetForm()
  return (
    <GroovyPlayer
      onChange={({ instrument, newPattern }) =>
        updateFormData({ patterns: { [instrument]: newPattern } })
      }
      beatSize={beatSize}
      readonly={false}
      signal={signal}
      swingStyle={swing}
      onTempoChange={(tempo) =>
        syncTempo &&
        tempo >= 60 &&
        tempo <= 200 &&
        updateFormData({ tempo: String(tempo) })
      }
      tempo={tempo ? Number(tempo) : 110}
      tracks={Object.keys(patterns)
        .map((instrument) => ({
          instrument,
          title: instrument,
          pattern: patterns[instrument],
        }))
        .filter((track) => Boolean(track.pattern))}
    />
  )
}
