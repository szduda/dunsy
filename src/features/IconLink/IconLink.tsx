import { ComponentProps, FC, ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DjembeIcon, DundunIcon, InfoIcon } from "@/features/Icons";
import { cx } from "@/utils";

type Props = {
  icon: "djembe" | "dundun" | "question" | "story";
  iconSize?: number;
  text: ReactNode;
  ninja?: boolean;
  circle?: boolean;
} & ComponentProps<typeof Link>;

export const IconLink: FC<Props> = ({
  className,
  text,
  icon,
  ninja = false,
  circle = false,
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
      scroll={false}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cx([
        "transition hover:bg-yellowy/10 p-4 flex flex-col justify-center items-center  h-64 w-64",
        !ninja && "bg-yellowy/5",
        circle ? "rounded-full" : "rounded-xl",
        className,
      ])}
    >
      {typeof Icon === "string" ? (
        <Image
          placeholder="blur"
          blurDataURL="fallback.jpeg"
          src={`/${Icon}`}
          width={96}
          height={96}
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
