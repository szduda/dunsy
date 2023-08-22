import { FC, useEffect, useState } from "react";
import { Button, Input } from "..";
import { SnippetListItem } from "../SnippetForm/types";
import { getSnippets } from "../SnippetForm/api";

type Props = {
  onPick(id: string): void;
  onClose(): void;
};

export const PickSnippetModal: FC<Props> = ({ onPick, onClose }) => {
  const [term, setTerm] = useState("");
  const [selectedSnippet, selectSnippet] = useState("");

  const [snippets, setSnippets] = useState<SnippetListItem[]>([]);

  useEffect(() => {
    const asyncEffect = async () => {
      const snippets = await getSnippets(term.length > 2 ? term : undefined);
      setSnippets(snippets);
    };
    asyncEffect();
  }, [term]);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000C] flex justify-center items-center">
      <div className="fixed bg-white md:rounded-lg py-3 px-4 flex flex-col w-full md:w-[500px] h-full md:h-fit">
        <div className="w-full flex justify-between items-center text-gray-500">
          <div className="text-sm">Fixin&rsqo; da mess, huh?</div>
          <button
            className="w-8 h-8 font-bold rounded-full hover:bg-[#0002] hover:text-black transition-colors"
            onClick={onClose}
          >
            {"\u2715"}
          </button>
        </div>
        <form className="flex flex-col">
          <Input
            className="mt-4"
            placeholder="Search by tag"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <div className="my-6 overflow-y-scroll max-h-[288px]">
            {snippets.map(({ title, id }) => (
              <label
                key={id}
                className={[
                  "p-2 text-lg flex items-center cursor-pointer rounded-md hover:bg-orange-100 transition-colors",
                  selectedSnippet === id && "bg-orange-100",
                ]
                  .filter(Boolean)
                  .join(" ")}
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
            className={[
              "md:w-full",
              !selectedSnippet && "bg-gray-400 pointer-events-none",
            ]
              .filter(Boolean)
              .join(" ")}
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
