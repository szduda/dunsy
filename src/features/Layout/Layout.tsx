"use client";

import { FC, ReactNode } from "react";
import { usePathname } from "next/navigation";
import { GroovyContext } from "@/features";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  const pathname = usePathname();

  if (pathname.startsWith("/foladmin")) {
    return children;
  }

  return (
    <div className="transition-all duration-500 ease-in-out">
      <GroovyContext>
        <Header compact={pathname !== "/"} />
        <div className="relative">{children}</div>
      </GroovyContext>
    </div>
  );
};
