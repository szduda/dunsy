import { cx, useSearch } from "@/utils";
import { FC } from "react";

type Props = {
  dimmed?: boolean;
  small?: boolean;
} & (
  | {
      tagString: string;
      tags?: never;
    }
  | {
      tagString?: never;
      tags: string[];
    }
);

export const Tags: FC<Props> = ({
  tagString,
  tags,
  dimmed = false,
  small = false,
}) => {
  const { search } = useSearch();
  if (typeof tags === "undefined") {
    tags = tagString.split(",");
  }

  return (
    <div className="flex flex-wrap w-full">
      {tags.map((tag) => (
        <button
          onClick={() => (dimmed ? null : search(tag))}
          key={tag}
          className={cx([
            "mt-1 mx-0.5 tracking-wide rounded-md border",
            dimmed
              ? "border-graye-dark/50 text-graye/75 pointer-events-none opacity-75"
              : "bg-yellowy-light hover:bg-yellowy-dark border-yellowy text-blacky",
            small ? "text-md px-1" : "text-lg font-medium px-2",
          ])}
        >
          {tag.trim().toLowerCase()}
        </button>
      ))}
    </div>
  );
};
