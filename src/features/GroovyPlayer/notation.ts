import { SwingStyle } from "../SnippetApi/types";
import { drums } from "@/lib/MidiSounds";

export const fillBeat = (
  loopLength: number,
  tracks: any[],
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
    const result: boolean[] = [];
    for (let i = 0; i < prolongedPattern.length; i = i + 1) {
      result.push(prolongedPattern[i] === sound);
    }

    return result;
  };

  const parseDjembe = (pattern: string) => {
    // open: bts | mute: lc | flam: rf
    const sounds = "btslcrf".split("");
    const prolongBy = (loopLength / pattern.length - 1) * pattern.length;
    const results = [...Array(7)].map(() => Array<Boolean>());
    if (prolongBy > 0)
      results.forEach((_, i) => {
        const silence = [...Array(prolongBy)].map(() => false);
        results[i] = silence;
      });

    pattern
      .split("")
      .forEach((note) =>
        sounds.forEach((sound, i) => results[i].push(note === sound))
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
