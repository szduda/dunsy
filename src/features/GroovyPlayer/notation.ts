import { SwingStyle } from "../SnippetApi/types";
import { drums } from "@/lib/MidiSounds";
import { TTrack } from "./types";

// open: bts | mute: lc | flam: rf
const DJEMBE_SOUNDS = [..."btslcrf"];

export const fillBeat = (
  loopLength: number,
  tracks: TTrack[],
  muted: Record<string, boolean>,
  metronome: boolean,
  signalActive: boolean,
  signal: string
) => {
  const parse = (instrument: string, sound: string = "x") => {
    const pattern =
      tracks.find((t) => t.instrument === instrument)?.pattern ?? null;

    if (!pattern) return [];

    const prolongedPattern = pattern.repeat(loopLength / pattern.length);
    const result = [...prolongedPattern].map((note) => note === sound);

    return result;
  };

  const parseDjembe = (pattern: string) => {
    const prolongBy = loopLength - pattern.length;
    const silence = [...Array<boolean>(prolongBy)].fill(false);
    const results = [...Array(DJEMBE_SOUNDS.length)].map(() =>
      Array<boolean>()
    );

    if (prolongBy > 0) {
      results.forEach((_, i) => {
        results[i] = [...silence];
      });
    }

    [...pattern].forEach((note) =>
      DJEMBE_SOUNDS.forEach((sound, i) => results[i].push(note === sound))
    );

    return results;
  };

  const beatSize = loopLength % 3 ? 4 : 3;
  const generateMetronome = () =>
    [...Array(loopLength)].map((_, index) => index % beatSize === 0);

  const getLoops = () => [
    !muted["bell"] && parse("bell"),
    !muted["sangban"] && parse("sangban", "o"),
    !muted["sangban"] && parse("sangban", "x"),
    metronome && generateMetronome(),
    !muted["dundunba"] && parse("dundunba", "o"),
    !muted["dundunba"] && parse("dundunba", "x"),
    !muted["kenkeni"] && parse("kenkeni", "o"),
    !muted["kenkeni"] && parse("kenkeni", "x"),
    !muted["kenkeni2"] && parse("kenkeni2", "o"),
    !muted["kenkeni2"] && parse("kenkeni2", "x"),
    ...(signalActive ? parseDjembe(signal) : []),
  ];

  const loops = getLoops() as boolean[][];
  const beats: number[][][] = [];
  for (var i = 0; i < loopLength; i++) {
    const notes = drums
      .map((drum, index) => (loops?.[index]?.[i] ? drum : -1))
      .filter((n) => n > 0);
    beats.push([notes, []]);
  }

  return beats;
};

export const matchSignal = (
  beatSize: number,
  signal?: string,
  swingStyle: SwingStyle = ""
) => {
  if (signal) {
    return signal;
  } else if (swingStyle === ">>") {
    return "ttttt-tt-t--";
  } else if (beatSize % 2) {
    return "f-tt-tt-tt--";
  } else {
    return "f-tt-t-tt-t-t---";
  }
};
