export const DRUMS = {
  shaker: { sampleId: 3305, symbol: "x", instrument: "shaker", volume: 0.3 },
  bell: { sampleId: 3306, symbol: "x", instrument: "bell", volume: 0.7 },
  sangbanOpen: {
    sampleId: 3310,
    symbol: "o",
    instrument: "sangban",
    volume: 1.5,
  },
  sangbanClosed: {
    sampleId: 3311,
    symbol: "x",
    instrument: "sangban",
    volume: 1.5,
  },
  dundunbaOpen: {
    sampleId: 3312,
    symbol: "o",
    instrument: "dundunba",
    volume: 1.5,
  },
  dundunbaClosed: {
    sampleId: 3313,
    symbol: "x",
    instrument: "dundunba",
    volume: 2,
  },
  kenkeniOpen: {
    sampleId: 3314,
    symbol: "o",
    instrument: "kenkeni",
    volume: 1.5,
  },
  kenkeniClosed: {
    sampleId: 3315,
    symbol: "x",
    instrument: "kenkeni",
    volume: 1.5,
  },
  kenkeniOpen2: {
    sampleId: 3316,
    symbol: "o",
    instrument: "kenkeni2",
    volume: 1.5,
  },
  kenkeniClosed2: {
    sampleId: 3317,
    symbol: "x",
    instrument: "kenkeni2",
    volume: 1.5,
  },
  djembeOpenBass: {
    sampleId: 3321,
    symbol: "b",
    instrument: "djembe",
    volume: 5,
  },
  djembeOpenTone: {
    sampleId: 3318,
    symbol: "t",
    instrument: "djembe",
    volume: 4,
  },
  djembeOpenSlap: {
    sampleId: 3320,
    symbol: "s",
    instrument: "djembe",
    volume: 5,
  },
  djembeMuteTone: {
    sampleId: 3322,
    symbol: "l",
    instrument: "djembe",
    volume: 5,
  },
  djembeMuteSlap: {
    sampleId: 3322,
    symbol: "c",
    instrument: "djembe",
    volume: 5,
  },
  djembeFlamTone: {
    sampleId: 3319,
    symbol: "r",
    instrument: "djembe",
    volume: 10,
  },
  djembeFlamSlap: {
    sampleId: 3319,
    symbol: "f",
    instrument: "djembe",
    volume: 10,
  },
};

// open: bts | mute: lc | flam: rf
export const DJEMBE_SOUNDS = Object.values(DRUMS)
  .filter((val) => val.instrument === "djembe")
  .map((val) => val.symbol);

export const SAMPLE_IDS = Object.values(DRUMS).map((val) => val.sampleId);
