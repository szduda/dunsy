import Link from "next/link";
import { ComponentProps, FC } from "react";

export const Paragraph: FC<ComponentProps<"p">> = (props) => (
  <p className="mt-6 text-xl leading-relaxed tracking-wide" {...props} />
);

export const H2: FC<ComponentProps<"h2">> = (props) => (
  <h2 className="text-graye text-3xl mt-24 drop-shadow-lg tracking-wider" {...props} />
);

export const TextLink: FC<ComponentProps<typeof Link>> = (props) => (
  <Link className="underline hover:no-underline tracking-widest" {...props} />
);
