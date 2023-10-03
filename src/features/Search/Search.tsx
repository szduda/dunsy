import { ComponentProps, FC, Suspense, useState } from "react";
import { useSearchForm } from "@/features";
import { SearchIcon } from "@/features/Icons";
import { Button } from "@/features/rsc";

export const Search: FC = () => (
  <Suspense fallback={<SearchFallback />}>
    <ClientSearch />
  </Suspense>
);

const ClientSearch: FC = () => {
  const { suggestions, term, setTerm, submitSearch, search } = useSearchForm();
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);

  return (
    <>
      {suggestionsOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 animate-fadein bg-yellowy/5"
          onClick={() => setSuggestionsOpen(false)}
          style={{ zIndex: 10000 }}
        />
      )}
      <form
        className="flex-1 flex relative"
        onSubmit={(e) => {
          submitSearch(e);
          setSuggestionsOpen(false);
        }}
      >
        <SearchInput
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => setSuggestionsOpen(true)}
        />
        <SearchButton type="submit" />
        {suggestionsOpen && (
          <Suggestions
            suggestions={suggestions}
            onSelect={(suggestion) => {
              setTerm(suggestion);
              search(suggestion);
            }}
            onClose={() => setSuggestionsOpen(false)}
          />
        )}
      </form>
    </>
  );
};

const SearchFallback = () => (
  <div className="flex-1 flex">
    <SearchInput />
    <SearchButton />
  </div>
);

const Suggestions: FC<{
  suggestions: string[];
  onSelect(term: string): void;
  onClose(): void;
}> = ({ suggestions, onSelect, onClose }) =>
  suggestions?.length ? (
    <>
      <ul
        className="absolute top-full left-0 right-[46px] rounded-md py-1 overflow-hidden bg-blacky text-whitey"
        style={{ zIndex: 10001 }}
      >
        {suggestions.map((suggestion) => (
          <li key={suggestion}>
            <button
              onClick={() => {
                onSelect(suggestion);
                onClose();
              }}
              className="py-1 px-1 hover:bg-greeny-dark w-full text-left"
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
    </>
  ) : null;

const SearchInput: FC<ComponentProps<"input">> = ({ ...props }) => (
  <input
    placeholder="type e.g. djansa, 4/4"
    className="bg-greeny-darker flex-1 md:flex-0 brightness-125 rounded-md h-[40px] opacity-50 hover:opacity-75 focus:opacity-100 focus:bg-blacky/60 focus:outline-none px-2 py-1 text-whitey"
    {...props}
  />
);

const SearchButton: FC<ComponentProps<typeof Button>> = (props) => (
  <Button
    mini
    circle
    colorClasses="hover:bg-graye-dark"
    className="ml-1"
    padding="p-2"
    aria-label="search"
    {...props}
  >
    <SearchIcon className="fill-whitey" />
  </Button>
);
