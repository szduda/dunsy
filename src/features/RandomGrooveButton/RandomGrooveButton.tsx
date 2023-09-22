import { FC } from "react";
import { IconLink, useGrooves } from "@/features";

export const RandomGrooveButton: FC = () => {
  const { cards } = useGrooves();
  const randomIndex = Math.round(Math.random() * cards.length);
  return (
    <IconLink
      href={{ pathname: cards[randomIndex]?.slug ?? "" }}
      icon="djembe"
      text="Play Along"
      className="mx-auto mt-1"
    />
  );
};
