import {
  createContext,
  useContext,
  useRef,
  useEffect,
  FC,
  ReactNode,
  useState,
} from "react";

import { MIDISounds } from "./midi-sounds-react";

const bell = 3306;
const sangbanClosed = 3311;
const sangban = 3310;
const shaker = 3305;
const dundunbaOpen = 3312;
const dundunbaClosed = 3313;
const kenkeniOpen = 3314;
const kenkeniClosed = 3315;
const kenkeniOpen2 = 3316;
const kenkeniClosed2 = 3317;
const djembeOpenBass = 3321;
const djembeOpenTone = 3318;
const djembeOpenSlap = 3320;
const djembeMuteTone = 3322;
const djembeMuteSlap = 3322;
const djembeFlamTone = 3319;
const djembeFlamSlap = 3319;

export const drums = [
  bell,
  sangban,
  sangbanClosed,
  shaker,
  dundunbaOpen,
  dundunbaClosed,
  kenkeniOpen,
  kenkeniClosed,
  kenkeniOpen2,
  kenkeniClosed2,
  djembeOpenBass,
  djembeOpenTone,
  djembeOpenSlap,
  djembeMuteTone,
  djembeMuteSlap,
  djembeFlamTone,
  djembeFlamSlap,
];

const MidiSoundsContext = createContext<any>(null);

export const useMidiSounds = () => useContext(MidiSoundsContext);

export const MidiSounds: FC<{ children: ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const midiSounds = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    return midiSounds.current?.stopPlayLoop;
  }, []);

  if (!isClient) return children;

  return (
    <MidiSoundsContext.Provider value={midiSounds}>
      {children}
      <MIDISounds ref={midiSounds} appElementName="root" drums={drums} />
    </MidiSoundsContext.Provider>
  );
};
