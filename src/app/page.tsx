import { Crossroad } from "@/features";
import { MidiSounds } from "@/lib/MidiSounds";

export default function Home() {
  return (
    <MidiSounds>
      <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[800px]">
        <Crossroad />
      </main>
    </MidiSounds>
  );
}
