import { FC, ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { SearchResultsOverlay } from "@/features";
import { cx } from "@/utils";
import { Header } from "./Header";
import { SnippetCard } from "../SnippetApi";
import { GroovyContext } from "./GroovyContext";

type Props = {
  children: ReactNode;
  data: SnippetCard[] | null;
};

export const Layout: FC<Props> = ({ children, data }) => {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const compact = searchOpen || pathname !== "/";

  if (pathname.startsWith("/admin")) {
    return children;
  }

  return (
    <div
      className={cx([
        compact && "-translate-y-[184px] md:-translate-y-[224px]",
        "transition-all duration-500 ease-in-out",
      ])}
    >
      <GroovyContext initialData={data}>
        <Header compact={compact} />
        <div className="relative">
          {children}
          <SearchResultsOverlay onToggle={setSearchOpen} />
        </div>
      </GroovyContext>
    </div>
  );
};
