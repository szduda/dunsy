import { SwingStyle } from "../SnippetApi/types";

export type TTrack = {
  title: string;
  pattern: string;
  instrument: string;
};

export type TGroovyPlayerContext = {
  playLoop(): void;
  stopLoop(): void;
  playing: boolean;
  metronome: boolean;
  setMetronome(arg: boolean): void;
  tempo: number;
  setTempo(arg: number): void;
  muted: Record<string, boolean>;
  setMuted(arg: TGroovyPlayerContext["muted"]): void;
  loopLength: number;
  beat: number;
  swing: boolean;
  setSwing(arg: boolean): void;
  playSignal(): void;
  signalActive: boolean;
  signalRequested: boolean;
};

export type TGroovyPlayerHook = (props: {
  tracks: TTrack[];
  initialMetronome: boolean;
  swingStyle: SwingStyle;
  initialTempo: number;
  signal?: string;
}) => TGroovyPlayerContext;
