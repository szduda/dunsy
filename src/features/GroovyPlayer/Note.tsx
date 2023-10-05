import { FC, ReactNode } from "react";
import { cx } from "@/utils";
import {
  SoundLowIcon,
  SoundMidIcon,
  SoundHighIcon,
  SoundHalfIcon,
} from "@/features/Icons";

type Props = {
  note: string;
  beat?: boolean;
  large?: boolean;
  instrument: string;
};

export const Note: FC<Props> = ({
  note,
  beat = false,
  large = false,
  instrument,
}) => (
  <div
    className={cx([
      "flex-1 text-center",
      large ? "py-2 lg:py-3" : "py-1 lg:py-2",
      beat && "bg-blacky/40",
    ])}
  >
    <span
      className={cx([
        "flex items-center justify-center h-full mx-auto",
        large
          ? "w-[20px] md:w-[36px] lg:w-[24px]"
          : "w-[10px] md:w-[20px] lg:w-[12px]",
        note === "-" && "opacity-25",
      ])}
    >
      {font[instrument]?.[note] ?? note}
    </span>
  </div>
);

const pauseSymbol = { "-": "\u22c5" };
const dundunSymbols = {
  ...pauseSymbol,
  o: <SoundLowIcon className="w-full" />,
  x: <SoundHighIcon className="w-full" />,
  i: <SoundMidIcon className="w-full" />,
};

const font: Record<string, Record<string, ReactNode>> = {
  dundunba: dundunSymbols,
  sangban: dundunSymbols,
  kenkeni: dundunSymbols,
  kenkeni2: dundunSymbols,
  djembe: {
    ...pauseSymbol,
    b: <SoundLowIcon className="w-full" />,
    t: <SoundMidIcon className="w-full" />,
    s: <SoundHighIcon className="w-full" />,
    f: <SoundHalfIcon className="w-full" />,
  },
  bell: {
    ...pauseSymbol,
    x: <SoundHalfIcon className="w-full" />,
  },
};
