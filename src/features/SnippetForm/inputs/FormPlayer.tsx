import { GroovyPlayer } from '@/features'
import { useSnippetForm } from '../SnippetFormContext'

export const FormPlayer = () => {
  const {
    formData: { patterns, signal, swing, tempo },
  } = useSnippetForm()
  return (
    <GroovyPlayer
      signal={signal}
      swingStyle={swing}
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
