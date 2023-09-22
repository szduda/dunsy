import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SearchResultsOverlay, GroovyContext } from "@/features";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return children;
  }

  return (
    <div className="transition-all duration-500 ease-in-out">
      <GroovyContext>
        <Header compact={pathname !== "/"} />
        <div className="relative">
          {children}
          <SearchResultsOverlay />
        </div>
      </GroovyContext>
    </div>
  );
};
