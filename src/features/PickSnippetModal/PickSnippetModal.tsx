import { FC, useEffect, useState } from "react";
import { Button, Input } from "@/features/rsc";
import { getSnippets } from "@/features/SnippetApi";
import { SnippetCard } from "@/features/SnippetApi/types";
import { CloseIcon } from "@/features/Icons";
import { cx } from "@/utils";
import Link from "next/link";
import throttle from "throttleit";

type Props = {
  className?: string;
  onPick(id: string): void;
};

const getSnippetsThrottled = throttle(getSnippets, 1000);

export const PickSnippetModal: FC<Props> = ({ onPick }) => {
  const [term, setTerm] = useState("");
  const [selectedSnippet, selectSnippet] = useState("");

  const [snippets, setSnippets] = useState<SnippetCard[]>([]);

  useEffect(() => {
    const asyncEffect = async () => {
      if (snippets.length && term.length < 3) {
        return;
      }

      const newSnippets = await getSnippetsThrottled(term, {
        limit: 10,
      });
      setSnippets(newSnippets);
      selectSnippet("");
    };

    const timeout = setTimeout(asyncEffect, 500);
    return () => clearTimeout(timeout);
  }, [term]);

  return (
    <div
      className={cx([
        "fixed top-0 left-0 w-full h-full bg-gradient-radial from-[#0008] via-[#000C] to-[#000E] flex justify-center items-end",
        "",
      ])}
    >
      <div className="fixed bg-graye-dark md:rounded-lg py-3 px-4 flex flex-col w-full md:w-[500px] h-full md:h-fit">
        <div className="w-full flex justify-between items-center text-graye-light">
          <div className="text-sm">Fixin&rsquo; da mess, huh?</div>
          <Link
            href="/admin"
            className="w-8 h-8 flex items-center font-bold rounded-full hover:bg-[#0002] transition-colors"
          >
            <CloseIcon className="mx-auto fill-graye-light" />
          </Link>
        </div>
        <form className="flex flex-col">
          <Input
            className="mt-4"
            placeholder="Search by tag"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <div className="my-6 overflow-y-scroll h-[calc(100dvh-224px)] md:h-[50dvh]">
            {snippets.map(({ title, id }) => (
              <label
                key={id}
                className={cx([
                  "p-2 mb-0.5 text-lg flex items-center cursor-pointer rounded-md hover:bg-graye transition-colors",
                  selectedSnippet === id && "bg-graye",
                ])}
              >
                <input
                  type="radio"
                  className="w-5 h-5 mr-2"
                  checked={selectedSnippet === id}
                  onChange={(e) => e.target.checked && selectSnippet(id)}
                />
                {title}
              </label>
            ))}
          </div>
          <Button
            disabled={!selectedSnippet}
            className="md:w-full"
            onClick={(e) => {
              e.preventDefault();
              onPick(selectedSnippet);
            }}
          >
            Edit
          </Button>
        </form>
      </div>
    </div>
  );
};
