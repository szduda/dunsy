import {
  createContext,
  useContext,
  useRef,
  useEffect,
  FC,
  ReactNode,
  useState,
} from 'react'

import { MIDISounds } from './midi-sounds-react'
import { SAMPLE_IDS } from './config'

const MidiSoundsContext = createContext<any>(null)

export const useMidiSounds = () => useContext(MidiSoundsContext)

export const MidiSounds: FC<{ children: ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false)
  const midiSounds = useRef<any>(null)

  useEffect(() => {
    setIsClient(true)
    return midiSounds.current?.stopPlayLoop
  }, [])

  if (!isClient) return children

  return (
    <MidiSoundsContext.Provider value={midiSounds}>
      {children}
      <MIDISounds ref={midiSounds} appElementName='root' drums={SAMPLE_IDS} />
    </MidiSoundsContext.Provider>
  )
}
