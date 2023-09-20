import { cx, useSearch } from "@/utils";
import { FC, Suspense } from "react";

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

export const Tags: FC<Props> = (props) => (
  <Suspense fallback="Loading">
    <ClientTags {...props} />
  </Suspense>
);

const ClientTags: FC<Props> = ({ tagString, tags }) => {
  const { search } = useSearch();
  if (typeof tags === "undefined") {
    tags = tagString.split(",");
  }

  return (
    <div className="flex flex-wrap w-full">
      {tags.map((tag) => (
        <button
          onClick={() => search(tag)}
          key={tag}
          className={cx([
            "mt-1 mx-0.5 tracking-wide rounded-md border",
            "bg-yellowy-light hover:bg-orangey-dark border-yellowy text-blacky",
            "text-lg font-medium px-2",
          ])}
        >
          {tag.trim().toLowerCase()}
        </button>
      ))}
    </div>
  );
};

export const CardTags: FC<Props> = ({ tagString, tags }) => {
  if (typeof tags === "undefined") {
    tags = tagString.split(",");
  }

  return (
    <div className="flex flex-wrap w-full">
      {tags.map((tag) => (
        <span
          key={tag}
          className={cx([
            "mt-1 mx-0.5 tracking-wide rounded-md border",
            "border-graye-dark/50 text-graye/75 pointer-events-none opacity-75",
            "text-md px-1",
          ])}
        >
          {tag.trim().toLowerCase()}
        </span>
      ))}
    </div>
  );
};
