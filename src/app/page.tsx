import { FC } from "react";
import Link from "next/link";
import { getRecentlyAdded } from "@/features/SnippetApi";
import { Button, Card } from "@/features";
import { DjembeIcon, DundunIcon } from "@/features/Icons";

const HomePage: FC = async () => {
  const recentlyAdded = await getRecentlyAdded();
  return (
    <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[1024px]">
      <h2 className="text-graye text-3xl mt-6 text-center">Practicing your djembe?</h2>
      {/* <p className="mt-8 lg:mt-12 mx-auto max-w-[640px]">   </p> */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 max-w-[640px] mx-auto mt-12 font-bold text-xl">
        <div className="p-4 flex flex-col justify-center items-center bg-greeny/10 rounded-full h-64 w-64">
          <DundunIcon />
          <h3 className="p-3 text-center">
            Pick the
            <br />
            backing track
          </h3>
        </div>
        <div className="flex flex-col justify-center items-center bg-greeny/10 rounded-full h-64 w-64">
          <DjembeIcon />
          <h3 className="p-3 text-center">Play along</h3>
        </div>
      </div>
      <h2 className="text-graye text-3xl mt-12">Recently added</h2>
      <div className="mt-12 w-full mx-auto grid md:grid-cols-2 gap-2 lg:gap-4">
        {recentlyAdded.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <Button className="mt-12">Browse all tracks</Button>
    </main>
  );
};

export default HomePage;
