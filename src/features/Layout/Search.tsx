import { ComponentProps, FC, useEffect, useState } from "react";
import { Button } from "@/features";
import { SearchIcon } from "@/features/Icons";
import { useSearch } from "@/utils";

export const Search = () => {
  const { search, term, setTerm } = useSearch();

  return (
    <form
      className="flex-1 flex"
      onSubmit={(e) => {
        e.preventDefault();
        search();
      }}
    >
      <SearchInput value={term} onChange={(e) => setTerm(e.target.value)} />
      <SearchButton onClick={search} />
    </form>
  );
};

const SearchInput: FC<ComponentProps<"input">> = (props) => (
  <input
    placeholder="tag or rhythm"
    className="bg-greeny-darker flex-1 md:flex-0 brightness-125 rounded-md h-[40px] opacity-50 hover:opacity-75 focus:opacity-100 focus:outline-none px-2 py-1 text-whitey"
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
    {...props}
  >
    <SearchIcon className="fill-whitey" />
  </Button>
);
