import { FC, ReactNode } from "react";
import { Header } from "./Header";
import { cx, useSearch } from "@/utils";
import { usePathname } from "next/navigation";
import { AuthContextProvider } from "@/features";
import { SearchResultsOverlay } from "./SearchResultsOverlay";

type Props = {
  children: ReactNode;
};
export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const { searchQuery } = useSearch();
  const sticky = Boolean(pathname && pathname !== "/") || Boolean(searchQuery);

  if (pathname.startsWith("/admin")) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
  }

  return (
    <div
      className={cx([
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
