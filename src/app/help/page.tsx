import { Button, Legend, TextLink, TopScrollGuard } from "@/features";
import { Bars } from "@/features";
import {
  GearIcon,
  PepperIcon,
  SearchIcon,
  ShekereIcon,
  SignalIcon,
  SoundHalfIcon,
  SoundHighIcon,
  SoundLowIcon,
} from "@/features/Icons";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const HelpPage: FC = () => (
  <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[1024px]">
    <TopScrollGuard top={0} />
    <h2 className="text-4xl tracking-wider text-greeny mt-12 mb-8 drop-shadow-lg">
      Website Features
    </h2>
    <Legend
      title="Search"
      description={
        <p>
          Search by tag or rhythm name: e.g. <i>konkoba</i>, <i>9/8</i>,{" "}
          <i>break</i>, or use it as navigation and type <i>all</i>, <i>help</i>{" "}
          or <i>story</i>. If you don&rsquo;t know what to search for you can{" "}
          <Link
            href="/grooves"
            className="underline hover:no-underline tracking-widest"
            scroll={false}
          >
            browse all rhythms
          </Link>{" "}
          at the grooves page.
        </p>
      }
      icon={<SearchIcon className="w-24 h-24 fill-whitey" />}
    />
    <h2 className="text-4xl tracking-wider text-yellowy mt-48 mb-8 drop-shadow-lg">
      Player Features
    </h2>
    <Legend
      title="Play Djembe Signal"
      description="Player will eventually play the signal. Just give it some time."
      icon={
        <SignalIcon
          className="w-24 h-24"
          innerClass2="animate-ping origin-center"
        />
      }
    />

    <Legend
      title="Shekere Pulse"
      description="It will play each pulse. No joke."
      icon={<ShekereIcon className="w-24 h-24 hover:animate-shake" />}
    />

    <Legend
      title={<span className="text-redy">Paprika Afreaka Spice</span>}
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
        <p>
          Inside you can increse the size of the bars (the player will display
          less bars per line) or turn on the Video Sync, which might be helpful
          if your bluetooth audio device has a delay in reference to the
          highlighted bar.
        </p>
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
        <p>
          Beats are where you stamp your foot. One bar contains two beats marked
          with a darker background. One beat is followed by 2 or 3 off-beats.
        </p>
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
        <p>
          The default sound of dun dun. You play it by striking the drum, then
          letting your hand bounce up right after it touch the skin.
        </p>
      }
      icon={<SoundLowIcon height={96} />}
    />

    <Legend
      title="Closed Sound"
      description={
        <p>
          You play it by striking the drum and slightly pressing the stick
          against the membrane to mute the sound. Don&rsquo;t press too strong.
          Keep the stick pressed until you need to play the next note.
        </p>
      }
      icon={<SoundHighIcon height={96} />}
    />

    <Legend
      title="Bell Sound"
      description={
        <p>Metal hits metal. The first you call a nail, the other a bell.</p>
      }
      icon={<SoundHalfIcon height={96} />}
    />

    <h3 className="text-graye text-3xl drop-shadow-lg mt-48">
      Need more help?
    </h3>
    <Link href="mailto:dunsy.contact@gmail.com" target="_blank">
      <Button className="mt-8">Send a message</Button>
    </Link>

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
        <p>
          Great people playing drums in the amazing old house. Check out both{" "}
          <TextLink href="https://www.moribaya.pl/?lang=en" target="_blank">
            Moribaya
          </TextLink>{" "}
          bandpage and{" "}
          <TextLink
            href="https://www.facebook.com/profile.php?id=100064576304359"
            target="_blank"
          >
            Kamionki
          </TextLink>{" "}
          fanpage.
        </p>
      }
      leftCol={
        <Image
          placeholder="blur"
          blurDataURL="favicons/fav-64.png"
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

export default HelpPage;
