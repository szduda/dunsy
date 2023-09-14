import { FC, ReactNode } from "react";
import { Header } from "./Header";
import { cx, useSearch } from "@/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { AuthContextProvider, Button, Tags } from "@/features";
import Link from "next/link";

type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { searchResults, clearSearch, term } = useSearch();

  if (pathname.startsWith("/admin")) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
  }

  const searchQuery = searchParams.get("search");
  const sticky = Boolean(pathname && pathname !== "/") || Boolean(searchQuery);

  return (
    <div
      className={cx([
        "transition-all duration-500 ease-in-out",
        sticky && "-translate-y-[184px] md:-translate-y-[224px]",
      ])}
    >
      <Header sticky={sticky} />
      <div className="relative" style={{ zIndex: searchQuery ? -1 : 0 }}>
        {children}
        <aside
          className={cx([
            "absolute top-0 left-0 right-0 bg-greeny-darker p-2 transition-all duration-500 ease-in-out",
            !searchQuery
              ? "translate-y-32 opacity-0 pointer-events-none h-[0px]"
              : "h-[calc(100dvh-58px)] overflow-y-auto",
          ])}
        >
          {searchResults.length > 0 && (
            <div className="pt-6 md:pt-14 tracking-wide text-xl text-graye flex items-center justify-center">
              <span className="opacity-75 pr-2">Search results for</span>
              <span className="font-bold text-2xl">{searchQuery}</span>
              <Button
                mini
                circle
                ninja
                onClick={clearSearch}
                className="ml-4 text-2xl lg:text-3xl"
              >
                {"\u2715"}
              </Button>
            </div>
          )}
          <div className="pt-8 lg:pt-16 max-w-[1280px] mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
            {searchResults.map((card) => (
              <Link
                key={card.id}
                href={`/${card.slug}`}
                className="p-2 lg:p-4 rounded-lg bg-blacky/50 flex flex-col justify-between"
              >
                <Tags tags={card.tags} dimmed small />
                <div className="pt-2 text-lg">{card.title}</div>
              </Link>
            ))}
            {searchQuery && searchResults.length === 0 && (
              <div className="col-span-4 flex flex-col items-center text-center">
                <div className="text-3xl lg:text-4xl text-graye">{term}?</div>
                <div className="mt-2 lg:mt-4 text-lg lg:text-xl">
                  I don&rsquo;t know a rhytm called {term} yet.
                </div>
                <Button
                  mini
                  onClick={clearSearch}
                  className="mt-8 lg: mt-16 w-[120px]"
                >
                  {"\u2715"}
                  <span className="pl-3">Close</span>
                </Button>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
