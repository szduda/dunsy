import { FC } from "react";
import Link from "next/link";
import { getRecentlyAdded } from "@/features/SnippetApi";
import { Button, Card } from "@/features";
import { DjembeIcon, DundunIcon, InfoIcon } from "@/features/Icons";

const HomePage: FC = async () => {
  const recentlyAdded = await getRecentlyAdded();
  const randomRecentGroove = recentlyAdded.sort(() => Math.random() * 2 > 1 ? 1 : -1)[0];
  console.log(recentlyAdded)
  return (
    <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[1024px]">
      <h2 className="text-graye text-3xl mt-6 text-center">
        Practicing your djembe?
      </h2>
      {/* <p className="mt-8 lg:mt-12 mx-auto max-w-[640px]">   </p> */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 max-w-[640px] mx-auto mt-12 font-bold text-xl">
        <Link
          href="/grooves"
          className="transition hover:bg-greeny/50 p-4 flex flex-col justify-center items-center bg-greeny/10 rounded-full h-64 w-64"
        >
          <DundunIcon />
          <h3 className="p-3 text-center">
            Pick the
            <br />
            backing track
          </h3>
        </Link>
        <Link
          href={`/${randomRecentGroove.slug}`}
          className="transition hover:bg-greeny/50 flex flex-col justify-center items-center bg-greeny/10 rounded-full h-64 w-64"
        >
          <DjembeIcon />
          <h3 className="p-3 text-center">Play along</h3>
        </Link>
      </div>
      <h2 className="text-graye text-3xl mt-24">Recently added</h2>
      <div className="mt-12 w-full mx-auto grid md:grid-cols-2 gap-2 lg:gap-4">
        {recentlyAdded.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <Link href="/grooves">
        <Button className="mt-12 hover:animate-pulse">Find your groove</Button>
      </Link>
      <h2 className="text-greeny text-3xl mt-32">Need help?</h2>
      <Link
        href="/about"
        className="transition hover:bg-greeny/50 p-4 flex flex-col justify-center items-center bg-greeny/10 rounded-full h-64 w-64 mt-12"
      >
        <InfoIcon className="w-16 h-16" />
        <h3 className="p-3 mt-3 text-center font-bold text-xl">
          Learn about
          <br />
          the player
        </h3>
      </Link>
    </main>
  );
};

export default HomePage;
