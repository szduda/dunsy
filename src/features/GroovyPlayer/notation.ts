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
  const barSize = loopLength % 3 ? 8 : 6;

  const parse = (instrument: string, sound: string = "x") => {
    const pattern =
      tracks.find((t) => t.instrument === instrument)?.pattern ?? null;

    if (!pattern) return [];

    const prolongedPattern = prolongPattern(pattern, loopLength);
    const output = [...prolongedPattern].map((note) => note === sound);

    return output;
  };

  const parseDjembe = () => {
    const pattern =
      tracks.find((t) => t.instrument === "djembe")?.pattern ?? null;

    if (!pattern) {
      return [];
    }

    const output = [...Array(DJEMBE_SOUNDS.length)].map(() => Array<boolean>());
    const prolongedPattern = prolongPattern(pattern, loopLength);
    [...prolongedPattern].forEach((note) =>
      DJEMBE_SOUNDS.forEach((sound, i) => output[i].push(note === sound))
    );

    return output;
  };

  const parseSignalAtLoopEnd = () => {
    const prolongBy = loopLength - signal.length;

    if (prolongBy < 0) {
      return [];
    }

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

  const generateMetronome = () =>
    [...Array(loopLength)].map((_, index) => index % (barSize / 2) === 0);

  const getLoops = () => {
    const groove = Object.values(DRUMS)
      .map(({ instrument, symbol }) => {
        if (instrument === "shaker" && metronome) {
          return generateMetronome();
        } else if (muted[instrument]) {
          return false;
        } else if (instrument === "djembe") {
          return "skip";
        }

        return parse(instrument, symbol);
      })
      .filter((val) => val !== "skip");

    const signal = parseSignalAtLoopEnd();
    const djembeTrack = parseDjembe();

    return [...groove, ...(signalActive ? signal : djembeTrack)];
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

const prolongPattern = (pattern: string, loopLength: number) => {
  const barSize = loopLength % 3 ? 8 : 6;
  const excess = pattern.length % barSize;
  const fullBeatPattern =
    excess > 0 ? pattern + "-".repeat(barSize - excess) : pattern;
  return fullBeatPattern?.repeat(loopLength / fullBeatPattern.length);
};
