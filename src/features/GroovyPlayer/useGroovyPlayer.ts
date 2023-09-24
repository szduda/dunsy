import { useState, useEffect, useRef } from "react";

import { DRUMS, useMidiSounds } from "@/lib/MidiSounds";
import { TGroovyPlayerContext, TGroovyPlayerHook, TTrack } from "./types";
import { applySwing } from "./applySwing";
import { fillBeat, matchSignal } from "./notation";

export const useGroovyPlayer: TGroovyPlayerHook = ({
  tracks = [],
  initialMetronome = true,
  swingStyle = "",
  initialTempo = 110,
  signal = "",
}) => {
  const midiSounds = useMidiSounds();
  const [tempo, setTempo] = useState(initialTempo);
  const [muted, setMuted] = useState<TGroovyPlayerContext["muted"]>({});
  const [metronome, setMetronome] = useState(initialMetronome);
  const [playing, setPlaying] = useState(false);
  const [swing, setSwing] = useState(false);
  const [noteIndex, setNoteIndex] = useState(0);
  const [beat, setBeat] = useState(0);
  const [signalRequested, setSignalRequested] = useState(false);
  const [signalActive, setSignalActive] = useState(false);
  const currentBeats = useRef(Array<number[][]>());

  const loopLength = tracks.sort(byPatternLength)[0]?.pattern?.length ?? 0;
  const beatSize = loopLength % 3 === 0 ? 3 : 4;

  const calcTrueTempo = () => {
    const _tempo = swing && swingStyle ? 6 * tempo : tempo;
    return (beatSize / 4) * _tempo;
  };

  const trueTempo = useRef(calcTrueTempo());

  const playLoop = () => {
    midiSounds?.current?.startPlayLoop(
      currentBeats.current,
      trueTempo.current,
      1 / 16,
      0,
      setNoteIndex
    );
    setPlaying(true);
  };

  const stopLoop = () => {
    midiSounds?.current?.stopPlayLoop();
    setBeat(0);
    setNoteIndex(0);
    setPlaying(false);
  };

  const playSignal = () => {
    if (signalActive) setSignalActive(false);
    else setSignalRequested(true);
  };

  const toggleSignal = () => {
    if (
      (signalRequested && !signalActive) ||
      (!signalRequested && signalActive)
    ) {
      setSignalActive(signalRequested);
      if (signalRequested) setSignalRequested(false);
    }
  };

  const updateBeats = () => {
    if (!tracks || !tracks[0]) return;

    let beats = fillBeat(
      loopLength,
      tracks,
      muted,
      metronome,
      signalActive,
      matchSignal(beatSize, signal, swingStyle)
    );

    if (swing && swingStyle) beats = applySwing(beats, beatSize, swingStyle);

    if (currentBeats.current.length === beats.length)
      beats.forEach((beat, i) => {
        currentBeats.current[i] = beat;
      });
    else {
      currentBeats.current = beats;
      trueTempo.current = calcTrueTempo();
      if (playing) playLoop();
    }
  };

  // update beats and trueTempo on player settings change
  useEffect(() => {
    updateBeats();
  }, [muted, signalActive, metronome, swing]);

  useEffect(() => {
    trueTempo.current = calcTrueTempo();
  }, [tempo, swing]);

  // reset player settings on tracks change
  useEffect(() => {
    if (tempo !== initialTempo) setTempo(initialTempo);
    if (metronome !== initialMetronome) setMetronome(initialMetronome);
    setMuted({});
    const hasSwing = Boolean(swingStyle);
    if (swing !== hasSwing) setSwing(false);
    if (signalActive) setSignalActive(false);

    if (tracks.length === 0) stopLoop();
    else if (playing) playLoop();
  }, [tracks]);

  // counting 1,2,3,4
  useEffect(() => {
    const isLastNote = noteIndex === loopLength * (swing ? 6 : 1) - 1;
    const signalLength =
      signal?.length ?? beatSize % 3 ? 12 : 16 * (swing ? 6 : 1);
    const beforeSignal = !signalActive && noteIndex < loopLength - signalLength;
    if (isLastNote || beforeSignal) {
      toggleSignal();
    }

    // onBeat ...
    if (noteIndex % beatSize === beatSize - 1) {
      const lastBeat = loopLength / beatSize;
      const beatDelta =
        typeof beat === "number"
          ? Math.round(noteIndex / beatSize / (swing ? 6 : 1))
          : -1;
      const beatGamma = 1 + beatDelta > 0 ? beatDelta : 0;
      const beatIndex = beatGamma === lastBeat ? 1 : beatGamma + 1;

      setBeat(beatIndex);
    }
  }, [noteIndex]);

  // adjust volumes on mount
  // stop playback if player is closed
  useEffect(() => {
    Object.values(DRUMS).forEach(({ sampleId, volume }) =>
      midiSounds?.current?.setDrumVolume(sampleId, volume)
    );
    return stopLoop;
  }, []);

  return {
    playLoop,
    stopLoop,
    playing,
    metronome,
    setMetronome,
    tempo,
    setTempo,
    muted,
    setMuted,
    loopLength,
    beat,
    swing,
    setSwing,
    signalActive,
    signalRequested,
    playSignal,
  };
};

const byPatternLength = (t1: TTrack, t2: TTrack) =>
  (t2.pattern?.length ?? 0) - (t1.pattern?.length ?? 0);
