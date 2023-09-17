import { Button, Legend, TextLink } from "@/features";
import { Bars } from "@/features";
import {
  GearIcon,
  PepperIcon,
  SearchIcon,
  ShekereIcon,
  SignalIcon,
  SoundHighIcon,
  SoundLowIcon,
} from "@/features/Icons";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const AboutPage: FC = () => (
  <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[1024px]">
    <h2 className="text-4xl tracking-wider text-greeny mt-12 mb-8 drop-shadow-lg">
      Website Features
    </h2>
    <Legend
      title="Search By Tag"
      description={
        <>
          Search only works if you type the full tag name. If you don&rsquo;t
          know what to search for you can{" "}
          <Link href="/grooves" className="underline hover:no-underline">
            browse all rhythms at the grooves page.
          </Link>
        </>
      }
      icon={<SearchIcon className="w-24 h-24 fill-whitey" />}
    />
    <h2 className="text-4xl tracking-wider text-yellowy mt-48 mb-8 drop-shadow-lg">
      Player Features
    </h2>
    <Legend
      title="Play Djembe Signal"
      description="Player will eventually play the signal. Just give it some time."
      icon={<SignalIcon className="w-24 h-24" innerClass2="animate-sway" />}
    />

    <Legend
      title="Shekere Pulse"
      description="It will play each pulse. No joke."
      icon={<ShekereIcon className="w-24 h-24 hover:animate-shake" />}
    />

    <Legend
      title="Paprika Afreaka Spice"
      description="Groove it up. Apply swing, sometimes swong."
      icon={<PepperIcon className="w-24 h-24 hover:animate-spin" />}
    />

    <Legend
      title="Mute Track"
      description="It&rsquo;s ticked - you hear the track. It&rsquo;s empty - you don&rsquo;t."
      icon={
        <input
          type="checkbox"
          readOnly
          checked={true}
          className="w-24 h-24 hover:animate-dundun"
        />
      }
    />

    <Legend
      title="Player Settings"
      description={
        <>
          Inside you can increse the size of the bars (the player will display
          less bars per line) or turn on the Video Sync, which might be helpful
          if your bluetooth audio device has a delay in reference to the
          highlighted bar.
        </>
      }
      icon={
        <GearIcon className="w-24 h-24 stroke-graye hover:animate-spin-once" />
      }
    />

    <h2 className="text-4xl tracking-wider text-redy-light mt-48 mb-8 drop-shadow-lg">
      Drum Notation
    </h2>

    <Legend
      title="Bar & Beats"
      description={
        <>
          Beats are where you stamp your foot. One bar contains two beats marked
          with a darker background. One beat is followed by 2 or 3 off-beats.
        </>
      }
      icon={
        <div className="flex flex-col items-center">
          <Bars large id="" bars={["--------"]} />
          <div className="w-fit mt-4">
            <Bars large id="" bars={["------"]} activeIndex={0} />
          </div>
        </div>
      }
    />

    <Legend
      title="Open Sound"
      description={
        <>
          The default sound of dun dun. You play it by striking the drum, then
          letting your hand bounce up right after it touch the skin.
        </>
      }
      icon={<SoundLowIcon height={96} />}
    />

    <Legend
      title="Closed Sound"
      description={
        <>
          You play it by striking the drum and slightly pressing the stick
          against the membrane to mute the sound. Don&rsquo;t press too strong.
          Keep the stick pressed until you need to play the next note.
        </>
      }
      icon={<SoundHighIcon height={96} />}
    />

    <h3 className="text-graye text-3xl drop-shadow-lg mt-48">
      Need more help?
    </h3>
    <Button className="mt-8">Send a message</Button>

    <h3 className="text-graye text-3xl drop-shadow-lg mt-48">App Version</h3>
    <div className="mt-8 pr-4 pl-6 py-4 border border-yellowy-light/25 rounded-full flex items-baseline">
      <div className="text-2xl">v0.1</div>
      <div className="bg-yellowy-light/75 font-medium uppercase text-sm rounded-full px-2 py-0.5 ml-3 text-blacky self-center">
        beta
      </div>
    </div>

    <Legend
      className="pt-48"
      title="Background photo"
      description={
        <>
          Great people playing drums in the amazing old house. Check out both{" "}
          <TextLink href="https://www.moribaya.pl/?lang=en" target="_blank">
            Moribaya
          </TextLink>{" "}
          band and{" "}
          <TextLink
            href="https://www.facebook.com/profile.php?id=100064576304359"
            target="_blank"
          >
            Kamionki
          </TextLink>{" "}
          fanpage.
        </>
      }
      leftCol={
        <Image
          alt="people playing drums"
          src="/bg_.jpg"
          className="rounded-3xl"
          width={400}
          height={300}
        />
      }
    />
  </main>
);

export default AboutPage;
