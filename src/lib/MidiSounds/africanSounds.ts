type DrumInfo = {
  variable: string;
  url: string;
  pitch: number;
  title: string;
};

const getUrl = (filename: string) => `/sounds/${filename}.js`;
// `https://firebasestorage.googleapis.com/v0/b/creactive-83d83.appspot.com/o/${filename}.js.gz?alt=media`;

export const africanSounds: Record<number, DrumInfo> = {
  //shaker
  3305: {
    variable: "_shaker",
    url: getUrl("shaker"),
    pitch: 78,
    title: "shaker",
  },

  //bell
  3306: {
    variable: "_bell",
    url: getUrl("bell"),
    pitch: 78,
    title: "bell",
  },

  // dunduns

  3310: {
    variable: "_drum_sangban_open",
    url: getUrl("sangbanOpen_new"),
    pitch: 78,
    title: "sangban open",
  },
  3311: {
    variable: "_drum_sangban_closed",
    url: getUrl("sangbanClosed"),
    pitch: 78,
    title: "sangban closed",
  },

  3312: {
    variable: "_drum_dundunba_open",
    url: getUrl("dundunbaOpen_new"),
    pitch: 78,
    title: "dundunba open",
  },

  3313: {
    variable: "_drum_dundunba_closed",
    url: getUrl("dundunbaClosed"),
    pitch: 78,
    title: "dundunba closed",
  },

  3314: {
    variable: "_drum_kenkeni_open",
    url: getUrl("kenkeniOpen_new"),
    pitch: 78,
    title: "kenkeni open",
  },

  3315: {
    variable: "_drum_kenkeni_closed",
    url: getUrl("kenkeniClosed"),
    pitch: 78,
    title: "kenkeni closed",
  },

  3316: {
    variable: "_drum_kenkeni_open",
    url: getUrl("kenkeniOpen"),
    pitch: 0,
    title: "kenkeni open 2",
  },

  3317: {
    variable: "_drum_kenkeni_closed_2",
    url: getUrl("kenkeniClosed2"),
    pitch: 0,
    title: "kenkeni closed 2",
  },

  // djembe

  3318: {
    variable: "_drum_djembe_open_tone",
    url: getUrl("djembeOpenTone"),
    pitch: 78,
    title: "djembe open tone",
  },

  3319: {
    variable: "_drum_djembe_flam_slap",
    url: getUrl("djembeFlamSlap"),
    pitch: 78,
    title: "djembe flam slap",
  },

  3320: {
    variable: "_drum_djembe_open_slap",
    url: getUrl("djembeOpenSlap"),
    pitch: 78,
    title: "djembe open slap",
  },

  3321: {
    variable: "_drum_djembe_open_bass",
    url: getUrl("djembeOpenBass"),
    pitch: 78,
    title: "djembe open slap",
  },

  3322: {
    variable: "_drum_djembe_mute_tone",
    url: getUrl("djembeMuteTone"),
    pitch: 78,
    title: "djembe open slap",
  },
};
