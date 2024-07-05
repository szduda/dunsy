## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3007](http://localhost:3007) with your browser to see the result.

## Audio Engine

Build with two open source projects coded by [surikov](https://github.com/surikov).

### WebAudioFont
It reads samples and handles AudioContext, so wave tables, envelopes, reverb, etc.

#### enahncements
- add samples of African drums
  - dundun, sangban, kenkeni open and close stokes
  - djembe slaps, tones, basses, flams
  - bell is currently a triangle sound from the original sound library

### MIDISounds
A player, looper and mixer for WebAudioFont phrases.

#### enhancements
- beat counting, onBeat callback
- decreased loop refresh rate to 5ms
  - which allowed to play faster or more densly
  - which allowed to create a swing hack - for each perceived beat of 4 (3) notes there are really 20 (15) notes:
    - to each 4 evenly spaced notes `1234 => 1....2....3....4....` 
    - you can apply some swing e.g. `1234 => 1......2..3......4..`
    - the dots are very small pauses, which when you move here or there they may eventually create a nice groovy feeling
    - mind that `1234` is not 4 beats, but 4 quarter notes, so 1 beat
    - since this is still a hack when such swing is applied the tempo needs to be quintupled, which gives a note duration of 60ms allowing to play 1000 notes per minute, that's 200 BPM of perceived tempo, and still include some margin to handle javascript intervals accuracy
    - if performance allows this factor (5) will be once increased to 6, the reason is a longer story :)
      
## Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
