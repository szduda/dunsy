import { ComponentProps, FC, Suspense, useEffect } from "react";
import Link from "next/link";
import { Button, Card } from "@/features";
import { cx, useSearch } from "@/utils";
import { CloseIcon, SearchIcon } from "../Icons";

type Props = {
  onOpen?(open: boolean): void;
};

export const SearchResultsOverlay: FC<Props> = (props) => (
  <Suspense>
    <SearchResultsOverlayClient {...props} />
  </Suspense>
);

const SearchResultsOverlayClient: FC<Props> = ({ onOpen = () => null }) => {
  const { searchResults, clearSearch, searchQuery, loading } = useSearch();
  const noResults =
    !loading && searchQuery && searchResults && searchResults.length === 0;

  useEffect(() => {
    onOpen?.(searchQuery.length > 2);
  }, [searchQuery]);

  return (
    <aside
      className={cx([
        "absolute top-0 left-0 right-0 bg-greeny-darker p-2 transition-all duration-500 ease-in-out",
        searchQuery
          ? "h-[calc(100dvh-58px)] overflow-y-auto"
          : "translate-y-32 opacity-0 pointer-events-none h-[0px]",
      ])}
    >
      {(searchResults?.length ?? 0) > 0 && (
        <div className="pt-6 md:pt-14 tracking-wide text-xl text-graye flex items-center justify-center">
          <div className="flex flex-1 md:flex-none flex-col md:flex-row">
            <span className="opacity-75 pr-2 self-baseline">
              Search results for
            </span>
            <span className="font-bold text-2xl self-baseline">
              {searchQuery}
            </span>
          </div>
          <CloseIconButton onClick={clearSearch} />
        </div>
      )}
      <div className="pt-8 lg:pt-16 max-w-[1280px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
        {searchResults?.map((card) => (
          <Card key={card.id} {...card} />
        ))}
        {noResults && (
          <div className="col-span-4 flex flex-col items-center text-center mt-32">
            <div className="text-3xl lg:text-4xl text-graye">
              {searchQuery}?
            </div>
            <div className="mt-6 lg:mt-12 text-lg lg:text-xl">
              I don&rsquo;t know a rhytm called {searchQuery} yet.
            </div>
            <Link href="/grooves">
              <Button className="mt-8 lg:mt-16">Show all tracks</Button>
            </Link>
            <CloseButton onClick={clearSearch} />
          </div>
        )}
      </div>
      <div
        className={cx([
          "h-screen fixed top-[120px] left-0 right-0 md:top-[160px] flex justify-center bg-greeny-darker/75 pt-32 md:pt-40 transition-all duration-500 origin-center pointer-events-none",
          !loading && "opacity-0",
        ])}
      >
        <SearchIcon
          height={128}
          className={cx([
            !loading && "opacity-0",
            "delay-100 duration-500 animate-swaye origin-bottom-right fill-yellowy/50",
          ])}
        />
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
