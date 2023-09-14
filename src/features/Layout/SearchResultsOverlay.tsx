import { ComponentProps, FC } from "react";
import { cx, useSearch } from "@/utils";
import { Button, Card } from "@/features";

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
          <div className="col-span-4 flex flex-col items-center text-center">
            <div className="text-3xl lg:text-4xl text-graye">{term}?</div>
            <div className="mt-2 lg:mt-4 text-lg lg:text-xl">
              I don&rsquo;t know a rhytm called {term} yet.
            </div>
            <CloseButton onClick={clearSearch} />
          </div>
        )}
      </div>
    </aside>
  );
};

const CloseIconButton: FC<ComponentProps<"button">> = (props) => (
  <Button mini circle ninja className="ml-4 text-2xl lg:text-3xl" {...props}>
    {"\u2715"}
  </Button>
);

const CloseButton: FC<ComponentProps<"button">> = (props) => (
  <Button mini className="mt-8 lg: mt-16 w-[120px]" {...props}>
    {"\u2715"}
    <span className="pl-3">Close</span>
  </Button>
);
