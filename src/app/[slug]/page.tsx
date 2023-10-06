import { GroovyPlayer, Tags, TopScrollGuard } from "@/features";
import { getSnippetBySlug, getSnippets } from "@/features/SnippetApi";
import { ResolvingMetadata } from "next";
import { FC } from "react";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const RhythmPage: FC<Props> = async ({ params }) => {
  const data = await getSnippetBySlug(params.slug);

  if (!data) {
    redirect("/not-found");
  }

  return (
    <main className="flex mx-auto flex-col items-center pt-8 max-w-[1024px] min-h-[calc(100dvh-58px)]">
      <TopScrollGuard logoLine />
      <div className="px-2 lg:px-8 w-full md:w-3/4 self-start pt-4 md:pt-8">
        <Tags tagString={data.tags} />
        <h1 className="w-full text-5xl font-black mt-5 capitalize drop-shadow-lg">
          {data.title}
        </h1>
        {data.description && (
          <p className="mt-6 md:mt-12 text-graye-light">{data.description}</p>
        )}
      </div>
      <GroovyPlayer
        signal={data.signal}
        className="md:w-full mt-12 md:mt-16 -mx-2"
        swingStyle={data.swing}
        tempo={data.tempo ? Number(data.tempo) : 110}
        tracks={Object.keys(data.patterns)
          .map((instrument) => ({
            instrument,
            title: instrument,
            pattern: data.patterns[instrument],
          }))
          .filter((track) => Boolean(track.pattern))}
      />
    </main>
  );
};

export async function generateStaticParams() {
  const snippets = await getSnippets(undefined, { limit: 1000 });
  return snippets.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
) {
  const snippet = await getSnippetBySlug(params.slug);

  if (!snippet) {
    return {
      title: "Page Not Found",
    };
  }

  const parentMeta = await parent;
  const title = snippet?.title
    .split(" ")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.substring(1)}`)
    .join(" ");

  const shortDescription = (snippet?.description ?? "").substring(0, 100);
  const description = `${
    shortDescription ? `${shortDescription}... | ` : ""
  }Listen to ${title} groove and enjoy your drumming practice. Wasa wasa!`;

  return {
    title: `${title} - ${parentMeta.title?.absolute}`,
    description,
    openGraph: {
      images: ["/og_player.png"],
      description,
    },
  };
}

export default RhythmPage;
