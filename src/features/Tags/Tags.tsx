import { FC, Suspense } from "react";
import { useSearch } from "@/features";
import { cx } from "@/utils";

type Props = {
  onClick?(tag: string): void;
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
  <Suspense fallback={<ServerTags {...props} />}>
    <ClientTags {...props} />
  </Suspense>
);

const ClientTags: FC<Props> = (props) => {
  const { search } = useSearch();

  return <ServerTags {...props} onClick={search} />;
};

const ServerTags: FC<Props> = ({ tagString, tags, onClick }) => {
  if (typeof tags === "undefined") {
    tags = tagString.split(",");
  }

  return (
    <div className="flex flex-wrap w-full">
      {tags.map((tag) => (
        <button
          key={tag}
          className={cx([
            "mt-1 mx-0.5 tracking-wide rounded-md border",
            "bg-yellowy-light hover:bg-orangey-dark border-yellowy text-blacky",
            "text-lg font-medium px-2",
          ])}
          onClick={onClick ? () => onClick(tag) : undefined}
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
