import { ComponentProps, FC, Suspense, useState } from "react";
import { Button } from "@/features";
import { SearchIcon } from "@/features/Icons";
import { useSearch } from "@/utils";

export const Search = () => (
  <Suspense fallback={<SearchFallback />}>
    <ClientSearch />
  </Suspense>
);

const ClientSearch = () => {
  const { search, searchQuery } = useSearch();
  const [term, setTerm] = useState(searchQuery);

  return (
    <form
      className="flex-1 flex"
      onSubmit={(e) => {
        e.preventDefault();
        search(term);
      }}
    >
      <SearchInput value={term} onChange={(e) => setTerm(e.target.value)} />
      <SearchButton type="submit" />
    </form>
  );
};

const SearchFallback = () => (
  <div className="flex-1 flex">
    <SearchInput />
    <SearchButton />
  </div>
);

const SearchInput: FC<ComponentProps<"input">> = (props) => (
  <input
    placeholder="tag or rhythm"
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
