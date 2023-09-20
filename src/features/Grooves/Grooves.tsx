import { ComponentProps, FC, Suspense } from "react";
import { cx, useSearch } from "@/utils";

type GrooveTag = {
  tag: string;
  strength: number;
};

type Props = {
  data: GrooveTag[];
};

export const Grooves: FC<Props> = (props) => (
  <Suspense fallback={<ServerGrooves {...props} />}>
    <ClientGrooves {...props} />
  </Suspense>
);

const ClientGrooves: FC<Props> = (props) => {
  const { search } = useSearch();

  return <ServerGrooves {...props} search={search} />;
};

const ServerGrooves: FC<Props & { search?(term: string): void }> = ({
  data,
  search = undefined,
}) => {
  const maxStrength = Math.max(...data.map((item) => item.strength));

  return (
    <div className="flex flex-wrap w-full">
      {data.sort(byTag).map(({ tag, strength }, index) => {
        const str = strength / maxStrength;
        return (
          <button
            onClick={search ? () => search(tag) : undefined}
            key={tag}
            className={cx([
              "break-all",
              "m-1 lg:m-2 rounded-md border py-2 px-3 h-min",
              "hover:scale-125 transition",
              ["self-center", "self-start", "self-end"].at(index % 3),
              str > 0.9
                ? "text-8xl bg-yellowy-light border-yellowy text-blacky  tracking-tighter"
                : str > 0.8
                ? "text-7xl bg-yellowy/10 border-yellowy/50 font-medium"
                : str > 0.7
                ? "text-7xl bg-redy-dark border-yellowy-50 font-bold"
                : str > 0.6
                ? "text-6xl bg-redy/25 border-whitey/50 font-bold"
                : str > 0.5
                ? "text-5xl bg-orangey border-orangey-light/25 text-blacky font-bold"
                : str > 0.4
                ? "text-4xl bg-orangey-dark border-yellowy/50 text-graye-light font-medium"
                : str > 0.3
                ? "text-3xl bg-greeny-light border-whitey/25 text-graye-darker font-medium"
                : str > 0.2
                ? "text-2xl bg-greeny border-greeny-dark text-graye-lighter/90 font-medium"
                : str > 0.1
                ? "text-xl bg-greeny/50 border-whitey/10 text-graye-light"
                : "text-lg text-graye-light/90 bg-greeny-darker border-graye/25",
            ])}
          >
            {tag.trim().toLowerCase()}
          </button>
        );
      })}
    </div>
  );
};

const byTag = (t1: GrooveTag, t2: GrooveTag) => (t1.tag > t2.tag ? 1 : -1);
