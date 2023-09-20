import { FC } from "react";
import Link from "next/link";
import { CardTags } from "@/features";
import { SnippetCard } from "@/features/SnippetApi";

export const Card: FC<SnippetCard> = ({ id, slug, title, tags }) => (
  <Link
    href={`/${slug}`}
    className="p-2 lg:p-4 rounded-lg bg-blacky/50 flex flex-col justify-between hover:bg-blacky/75 hover:scale-105 transition"
  >
    <CardTags tags={tags} />
    <div className="pt-2 text-lg capitalize">{title}</div>
  </Link>
);
