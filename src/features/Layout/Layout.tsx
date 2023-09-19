import { FC, ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { cx, useSearch } from "@/utils";
import { usePathname } from "next/navigation";
import { AuthContextProvider, SearchResultsOverlay } from "@/features";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const { searchQuery } = useSearch();
  const sticky = Boolean(pathname && pathname !== "/") || Boolean(searchQuery);

  useEffect(() => {
    document.body.classList.toggle("overflow-y-hidden", Boolean(searchQuery));
  }, [searchQuery]);

  if (pathname.startsWith("/admin")) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
  }

  return (
    <div
      className={cx([
        !(sticky && pathname !== "/") &&
          "transition-all duration-500 ease-in-out",
        sticky && "-translate-y-[184px] md:-translate-y-[224px]",
      ])}
    >
      <Header sticky={sticky} />
      <div className="relative">
        {children}
        <SearchResultsOverlay />
      </div>
    </div>
  );
};
