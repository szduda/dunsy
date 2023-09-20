import { FC, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchResultsOverlay } from "@/features";
import { cx } from "@/utils";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  // const [hasScrolled, setHasScrolled] = useState(false);
  const isHome = pathname === "/";

  const compact = searchOpen || !isHome;

  // console.log("szd", searchOpen, isHome);

  // useEffect(() => {
  //   addEventListener("scroll", () => {
  //     setHasScrolled(window.scrollY > 240);
  //   });
  // }, []);

  if (pathname.startsWith("/admin")) {
    return children;
  }

  return (
    <div
      className={cx([
        compact ? "-translate-y-[184px] md:-translate-y-[224px]" : "",
        "transition-all duration-500 ease-in-out",
      ])}
    >
      <Header compact={compact} />
      <div className="relative">
        {children}
        <SearchResultsOverlay onOpen={setSearchOpen} />
      </div>
    </div>
  );
};
