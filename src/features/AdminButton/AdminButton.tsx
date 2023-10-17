import Link from "next/link";
import { ComponentProps, FC, useEffect, useState } from "react";
import { Button } from "../Button";
import { AdminIcon, BluescreenIcon } from "../Icons";

export const AdminButton: FC<Omit<ComponentProps<typeof Link>, "href">> = (
  props
) => {
  const [hover, setHover] = useState(false);
  const [fola, setFola] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("Trust me I'm a writer")) {
      setFola(true);
    }
  }, []);

  if (!fola) {
    return null;
  }

  return (
    <Link {...props} href="/foladmin" scroll={false} className="flex">
      <Button
        mini
        ninja
        className="!scale-100"
        colorClasses="hover:bg-graye-dark !filter-none"
        padding="p-0"
        aria-label="help"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover ? <BluescreenIcon /> : <AdminIcon />}
      </Button>
    </Link>
  );
};
