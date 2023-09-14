import { ComponentProps, FC } from "react";
import { cx, useSearch } from "@/utils";
import { Button, Card } from "@/features";
import { CloseIcon } from "../Icons";

export const SearchResultsOverlay: FC = () => {
  const { searchResults, clearSearch, term, searchQuery } = useSearch();

  return (
    <aside
      className={cx([
        "absolute top-0 left-0 right-0 bg-greeny-darker p-2 transition-all duration-500 ease-in-out",
        searchQuery
          ? "h-[calc(100dvh-58px)] overflow-y-auto"
          : "translate-y-32 opacity-0 pointer-events-none h-[0px]",
      ])}
    >
      {searchResults.length > 0 && (
        <div className="pt-6 md:pt-14 tracking-wide text-xl text-graye flex items-center justify-center">
          <span className="opacity-75 pr-2">Search results for</span>
          <span className="font-bold text-2xl">{searchQuery}</span>
          <CloseIconButton onClick={clearSearch} />
        </div>
      )}
      <div className="pt-8 lg:pt-16 max-w-[1280px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        {searchResults.map((card) => (
          <Card key={card.id} {...card} />
        ))}
        {searchQuery && searchResults.length === 0 && (
          <div className="col-span-4 flex flex-col items-center text-center mt-16 lg:mt-32">
            <div className="text-3xl lg:text-4xl text-graye">{term}?</div>
            <div className="mt-2 lg:mt-4 text-lg lg:text-xl">
              I don&rsquo;t know a rhytm called {term} yet.
            </div>
            <Button className="mt-16 lg:mt-24">
              Show all tracks
            </Button>
            <CloseButton onClick={clearSearch} />
          </div>
        )}
      </div>
    </aside>
  );
};

const CloseIconButton: FC<ComponentProps<"button">> = (props) => (
  <button
    className="ml-4 rounded-full p-1 fill-whitey transition-all hover:scale-110 hover:fill-graye-light"
    {...props}
  >
    <CloseIcon className="lg:w-[40px] h-full" />
  </button>
);

const CloseButton: FC<ComponentProps<"button">> = (props) => (
  <Button ninja className="mt-4 w-[120px]" {...props}>
    <div className="flex justify-center">
      <CloseIcon className="fill-whitey mr-2 -ml-2" />
      <span>Close Search</span>
    </div>
  </Button>
);
