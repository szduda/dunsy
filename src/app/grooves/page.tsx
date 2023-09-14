import { FC } from "react";
import { getSnippets } from "@/features/SnippetApi";
import { Grooves } from "@/features";

const GroovesPage: FC = async () => {
  const allSnippets = await getSnippets(undefined, { limit: 1000 });
  const allTags = allSnippets.flatMap((snippet) => snippet.tags);

  let data: { tag: string; strength: number }[] = [];
  allTags.forEach((tag) => {
    const existing = data.find((item) => item.tag === tag);
    if (existing) {
      existing.strength = existing.strength + 1;
    } else {
      data.push({ tag, strength: 1 });
    }
  });

  return (
    <main className="flex mx-auto flex-col items-center justify-center px-2 pb-8 max-w-[1024px]">
      <h1 className="text-graye text-3xl my-16">All Grooves</h1>
      <Grooves data={data} />
    </main>
  );
};
export default GroovesPage;
