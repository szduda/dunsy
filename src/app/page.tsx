import { FC } from "react";
import Link from "next/link";
import { getRecentlyAdded } from "@/features/SnippetApi";
import { Button, Card } from "@/features";

const HomePage: FC = async () => {
  const recentlyAdded = await getRecentlyAdded();
  return (
    <main className="flex mx-auto flex-col items-center justify-center px-2 pt-8 pb-8 max-w-[1024px]">
      <h2 className="text-graye text-3xl mt-8 lg:mt-12">Welcome</h2>
      <p className="mt-8 lg:mt-12 mx-auto max-w-[640px]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h2 className="text-graye text-3xl mt-8 lg:mt-12">Recently added</h2>
      <div className="mt-8 lg:mt-12 w-full mx-auto grid md:grid-cols-2 gap-2 lg:gap-4">
        {recentlyAdded.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
      <Button className="mt-8 lg:mt-12">Browse all rhythms</Button>
    </main>
  );
};

export default HomePage;
