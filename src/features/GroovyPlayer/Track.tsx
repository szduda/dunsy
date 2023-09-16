import { FC, ReactNode, memo, useMemo } from "react";
import { cx } from "@/utils";
import { usePlayerSettings } from "./PlayerSettingsContext";
import { SoundLowIcon, SoundMidIcon, SoundHighIcon } from "@/features/Icons";

type Props = {
  title?: string;
  pattern?: string;
  muted?: boolean;
  setMuted?(muted: boolean): void;
  beat?: number;
};

export const Track: FC<Props> = ({
  title,
  pattern = "",
  muted,
  setMuted,
  beat = -1,
}) => {
  const barSize =
    [6, 8, 9].find((length) => pattern.length % length === 0) ?? pattern.length;

  const bars = useMemo(
    () => pattern?.match(RegExp(`.{1,${barSize}}`, "g")) ?? [],
    [pattern]
  );

  const { largeBars, videoSync } = usePlayerSettings();
  beat = videoSync ? beat - 1 : beat;

  return (
    <div className="px-1 py-4 lg:px-8 border-b-2 border-graye-darker w-full md:px-4">
      <label className="mx-1 flex align-center mb-4 w-fit cursor-pointer hover:opacity-75">
        <input
          className="mr-3 w-4 cursor-pointer"
          type="checkbox"
          aria-label={`${title} track ${muted ? "off" : "on"}`}
          onChange={() => setMuted?.(!muted)}
          checked={!muted}
          disabled={!pattern}
        />
        <div className="text-graye-light">{title}</div>
      </label>
      <div className={cx(["transition", muted && "opacity-10"])}>
        {pattern ? (
          <MemoBars
            large={largeBars}
            bars={bars}
            id={pattern}
            activeIndex={muted ? undefined : Math.round(beat / 2) - 1}
          />
        ) : (
          <div className="min-h-[48px] flex items-center justify-center text-graye-light">
            ...
          </div>
        )}
      </div>
    </div>
  );
};

type BarsProps = {
  id: string;
  bars: string[];
  large?: boolean;
  activeIndex?: number;
};

const Bars: FC<BarsProps> = ({ bars, activeIndex = -1, large = false }) => (
  <div
    className={cx([
      "grid gap-0.5 gap-y-3 w-full",
      large ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-4 lg:grid-cols-8",
    ])}
  >
    {bars.map((bar, index) => (
      <div
        key={bar + index}
        className={cx([
          "flex align-center w-full overflow-hidden",
          activeIndex === index ? "bg-greeny-dark" : "bg-graye-darkest",
          large ? "rounded-3xl" : "rounded-2xl",
        ])}
      >
        {[...bar].map((note, noteIndex) => (
          <div
            key={index + noteIndex}
            className={cx([
              "flex-1 text-center",
              large ? "py-2 lg:py-3" : "py-1 lg:py-2",

              (bar.length % 6 === 0
                ? [0, 3]
                : bar.length % 9 === 0
                ? [0, 3, 6]
                : [0, 4]
              ).includes(noteIndex) && "bg-blacky/40",
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
              {note in font ? font[note] : note}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
);

const MemoBars = memo(
  Bars,
  (prev, next) =>
    prev.id === next.id &&
    prev.activeIndex === next.activeIndex &&
    prev.large === next.large
);

const font: Record<string, ReactNode> = {
  "-": "\u22c5",
  o: <SoundLowIcon className="w-full" />,
  x: <SoundHighIcon className="w-full" />,
  i: <SoundMidIcon className="w-full" />,
};
