import { FC } from "react";
import Link from "next/link";
import { getRecentlyAdded } from "@/features/SnippetApi";
import { Button, Card, IconLink } from "@/features";

const HomePage: FC = async () => {
  const recentlyAdded = await getRecentlyAdded();
  const randomRecentGroove = recentlyAdded.sort(() =>
    Math.random() > 0.5 ? 1 : -1
  )[0];

  return (
    <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-24 max-w-[1024px]">
      <h2 className="text-graye text-3xl mt-6 text-center">
        Practicing your djembe?
      </h2>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 max-w-[640px] mx-auto mt-12 font-bold text-xl">
        <IconLink
          icon="dundun"
          text={<>Pick Backing Track</>}
          href="/grooves"
        />
        <IconLink
          href={`/${randomRecentGroove.slug}`}
          icon="djembe"
          text="Play Along"
        />
      </div>
      <div className="my-12 flex flex-col items-center justify-center">
        <h2 className="text-graye text-3xl mt-24">Recently added</h2>
        <div className="mt-12 w-full mx-auto grid md:grid-cols-2 gap-2 lg:gap-4">
          {recentlyAdded.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        <Link href="/grooves">
          <Button className="mt-12 hover:animate-pulse">
            Find your groove
          </Button>
        </Link>
      </div>
      <h2 className="text-greeny text-3xl mt-32">Need help?</h2>
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
      <h2 className="text-orangey/75 text-3xl mt-32">Enjoy clickbaits?</h2>
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
              they read this story
            </span>
          </>
        }
      />
    </main>
  );
};

export default HomePage;
