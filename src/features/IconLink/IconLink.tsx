import { ComponentProps, FC, ReactNode, useState } from "react";
import Link from "next/link";
import { DjembeIcon, DundunIcon, InfoIcon, PepperIcon } from "../Icons";
import { cx } from "@/utils";
import Image from "next/image";

type Props = {
  icon: "djembe" | "dundun" | "question" | "story";
  iconSize?: number;
  text: ReactNode;
} & ComponentProps<typeof Link>;

export const IconLink: FC<Props> = ({
  className,
  text,
  icon,
  iconSize = 128,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const icons = {
    dundun: DundunIcon,
    djembe: DjembeIcon,
    question: InfoIcon,
    story: "octopus.png",
  };
  const Icon = icons[icon];
  return (
    <Link
      {...props}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cx([
        "transition hover:bg-greeny/50 p-4 flex flex-col justify-center items-center bg-greeny/10 rounded-full h-64 w-64",
        className,
      ])}
    >
      {typeof Icon === "string" ? (
        <Image
          src={`/${Icon}`}
          width={96}
          height={96}
          quality={100}
          alt="Exploading head octopus"
          className={cx([hover && "animate-screw"])}
        />
      ) : (
        <Icon
          width={iconSize}
          height={iconSize}
          innerClass={cx([
            icon === "story" && "fill-redy stroke-blacky/50",
            hover && icon === "dundun" && "animate-dundun origin-center",
            hover && icon === "djembe" && "animate-djembe",
            hover && icon === "question" && "animate-sway origin-center",
          ])}
        />
      )}
      <h3 className="p-3 text-center">{text}</h3>
    </Link>
  );
};
