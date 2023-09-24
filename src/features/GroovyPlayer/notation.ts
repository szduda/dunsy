import { SwingStyle } from "../SnippetApi/types";
import { DJEMBE_SOUNDS, DRUMS, SAMPLE_IDS } from "@/lib/MidiSounds";
import { TTrack } from "./types";

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

  const parseSignalAtLoopEnd = () => {
    if (!signalActive) {
      return [];
    }

    const prolongBy = loopLength - signal.length;
    const silence = [...Array<boolean>(prolongBy)].fill(false);
    const results = [...Array(DJEMBE_SOUNDS.length)].map(() =>
      Array<boolean>()
    );

    if (prolongBy > 0) {
      results.forEach((_, i) => {
        results[i] = [...silence];
      });
    }

    [...signal].forEach((note) =>
      DJEMBE_SOUNDS.forEach((sound, i) => results[i].push(note === sound))
    );

    return results;
  };

  const beatSize = loopLength % 3 ? 4 : 3;
  const generateMetronome = () =>
    [...Array(loopLength)].map((_, index) => index % beatSize === 0);

  const getLoops = () => {
    const groove = Object.values(DRUMS)
      .map(({ instrument, symbol }) => {
        if (instrument === "shaker" && metronome) {
          return generateMetronome();
          // atm djembe sounds are only used to play the signal
        } else if (instrument !== "djembe" && !muted[instrument]) {
          return parse(instrument, symbol);
        }

        return false;
      })
      .filter(Boolean);

    const signal = parseSignalAtLoopEnd();

    return [...groove, ...signal];
  };

  const loops = getLoops() as boolean[][];
  const beats: number[][][] = [];
  for (var i = 0; i < loopLength; i++) {
    const notes = SAMPLE_IDS.map((sampleId, index) =>
      loops?.[index]?.[i] ? sampleId : -1
    ).filter((n) => n > 0);
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
