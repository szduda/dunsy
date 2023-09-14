import { FC } from "react";
import { cx, useSearch } from "@/utils";

type Props = {
  data: {
    tag: string;
    strength: number;
  }[];
};

export const Grooves: FC<Props> = ({ data }) => {
  const { search } = useSearch();
  const maxStrength = Math.max(...data.map((item) => item.strength));

  return (
    <div className="flex flex-wrap w-full">
      {data.map(({ tag, strength }, index) => {
        const str = strength / maxStrength;
        return (
          <button
            onClick={() => search(tag)}
            key={tag}
            className={cx([
              "m-1 lg:m-2 tracking-wide rounded-md border font-medium py-2 px-3 h-min",
              "hover:scale-125 transition",
              ["self-center", "self-start", "self-end"].at(index % 3),
              str > 0.9
                ? "text-9xl bg-yellowy-light border-yellowy text-blacky"
                : str > 0.8
                ? "text-8xl bg-yellowy/10 border-yellowy/50"
                : str > 0.7
                ? "text-7xl bg-redy-dark border-yellowy-50"
                : str > 0.6
                ? "text-6xl bg-redy/25 border-whitey/50"
                : str > 0.5
                ? "text-5xl bg-orangey border-orangey-light/25 text-blacky"
                : str > 0.4
                ? "text-4xl bg-orangey-dark border-yellowy/50 text-graye-light"
                : str > 0.3
                ? "text-3xl bg-greeny-light border-whitey/25 text-graye-darker"
                : str > 0.2
                ? "text-2xl bg-greeny border-greeny-dark text-graye-lighter/90"
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
