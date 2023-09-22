import { FC } from "react";
import Link from "next/link";
import { getRecentlyAdded } from "@/features/SnippetApi";
import { IconLink, RandomGrooveButton, TopScrollGuard } from "@/features";
import { Button, Card } from "@/features/rsc";

const HomePage: FC = async () => {
  const recentlyAdded = await getRecentlyAdded();

  return (
    <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-24 max-w-[1024px]">
      <TopScrollGuard top={0} />
      <h2 className="text-graye text-3xl mt-6 text-center tracking-wide drop-shadow-lg">
        Do you speak djembe?
      </h2>
      <div className="grid gap-x-4 md:grid-cols-2 md:gap-x-8 gap-y-12 max-w-[640px] mx-auto mt-12 font-bold text-xl">
        <p className="mx-auto md:col-span-2 text-center text-whitey font-medium">
          Dunsy is a web library & player of West African grooves. You will find
          here both traditional and modern style phrases, loops or breaks. All
          in form of MIDI snippets for you to listen or read.
        </p>
        <p className="mx-auto md:col-span-2 text-center text-greeny-light font-medium tracking-wider">
          Become a better fola
          <br />
          in just two steps
        </p>
        <IconLink
          icon="dundun"
          text="Pick Backing Track"
          href="/grooves"
          className="mx-auto mt-1"
        />
        <RandomGrooveButton />
      </div>
      <div className="my-12 flex flex-col items-center justify-center">
        <h2 className="text-graye text-3xl mt-24 tracking-wide drop-shadow-lg">
          Recently added
        </h2>
        <div className="mt-12 w-full mx-auto grid md:grid-cols-2 gap-2 lg:gap-4">
          {recentlyAdded.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        <Link href="/grooves" scroll={false} className="w-full md:w-fit">
          <Button className="mt-12 hover:animate-pulse">
            Find your groove
          </Button>
        </Link>
      </div>
      <h2 className="text-greeny text-3xl mt-32 tracking-wide drop-shadow-lg">
        Need help?
      </h2>
      <IconLink
        className="mt-12 font-bold text-xl"
        href="/help"
        icon="question"
        iconSize={96}
        text={
          <>
            Learn About
            <br />
            The Player
          </>
        }
      />
      <h2 className="text-orangey/75 text-3xl mt-32 tracking-wide drop-shadow-lg">
        Enjoy clickbaits?
      </h2>
      <IconLink
        className="mt-12"
        href="/story"
        icon="story"
        iconSize={96}
        text={
          <>
            <span className="text-xl font-bold">44 drummers </span>
            <span className="text-lg">
              became rich after
              <br />
              reading this story
            </span>
          </>
        }
      />
    </main>
  );
};

export default HomePage;
