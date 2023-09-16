import { ComponentProps, FC } from "react";
import Link from "next/link";
import { Button, Logo } from "@/features";
import { InfoIcon, LogoIcon } from "@/features/Icons";
import { cx } from "@/utils";
import { Search } from "./Search";

type Props = {
  sticky: boolean;
};

export const Header: FC<Props> = ({ sticky }) => {
  return (
    <header
      className={cx([
        "sticky",
        sticky ? "top-0" : "-top-[185px] md:-top-[225px]",
      ])}
      style={{ zIndex: 100 }}
    >
      <div className="flex justify-center items-center pt-8 md:pt-14 pb-6 md:pb-10 px-4 w-full">
        <Logo />
      </div>
      <nav
        className={cx([
          "flex justify-between items-center px-2 py-2 bg-greeny-darker shadow-md",
        ])}
      >
        <div className="flex items-center w-[64px] h-fit">
          {sticky ? (
            <SmallLogo />
          ) : (
            <InfoButton className="flex md:opacity-0" />
          )}
        </div>
        <div className="flex items-center pl-2 flex-1 md:flex-none md:w-[400px]">
          <Search />
        </div>
        <InfoButton className="hidden md:flex" />
      </nav>
    </header>
  );
};

const SmallLogo: FC = () => (
  <Link
    href="/"
    className="saturate-50 brightness-200 opacity-30 hover:brightness-100 hover:saturate-100 hover:opacity-100 flex"
  >
    <LogoIcon height="40" />
  </Link>
);

const InfoButton: FC<Omit<ComponentProps<typeof Link>, "href">> = (props) => (
  <Link {...props} href="/learn">
    <Button
      mini
      circle
      colorClasses="hover:bg-graye-dark"
      className="ml-1"
      padding="p-2"
    >
      <InfoIcon />
    </Button>
  </Link>
);
