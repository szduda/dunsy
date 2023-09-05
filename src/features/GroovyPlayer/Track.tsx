import { FC, memo, useMemo } from "react";
import { cx } from "@/utils";

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

  return (
    <div className="px-1 py-4 lg:px-8 border-bottom border-2 border-[#0001] w-full md:px-4">
      <label className="flex align-center mb-4 w-fit cursor-pointer">
        <input
          className="mr-3 w-4"
          type="checkbox"
          aria-label={`${title} track ${muted ? "off" : "on"}`}
          onChange={() => setMuted?.(!muted)}
          checked={!muted}
          disabled={!pattern}
        />
        <div className="text-neutral-400">{title}</div>
      </label>
      <div className={cx(["transition", muted && "opacity-10"])}>
        {pattern ? (
          <MemoBars
            bars={bars}
            id={pattern}
            activeIndex={muted ? undefined : Math.round(beat / 2) - 1}
          />
        ) : (
          <div className="min-h-[48px] flex items-center justify-center text-neutral-400">
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
  activeIndex?: number;
};

const Bars: FC<BarsProps> = ({ bars, activeIndex = -1 }) => (
  <div
    className={cx([
      "grid grid-cols-4 md:grid-cols-8 gap-1 gap-y-3 w-full",
      "text-md md:text-lg lg:text-xl leading-loose tracking-wide lg:tracking-wider font-medium lg:font-bold",
    ])}
  >
    {bars.map((bar, index) => (
      <div
        key={bar + index}
        className={cx([
          "flex align-center w-full rounded-md overflow-hidden",
          activeIndex === index ? "bg-[#410A]" : "bg-[#0004]",
        ])}
      >
        {[...bar].map((note, noteIndex) => (
          <span
            key={index + noteIndex}
            className={cx([
              "flex-1 py-1 text-center",
              noteIndex === 0 && "pl-1",
              noteIndex === bar.length - 1 && "pr-1",
              note === "-" && "text-neutral-600",
              (bar.length % 6 === 0
                ? [0, 3]
                : bar.length % 9 === 0
                ? [0, 3, 6]
                : [0, 4]
              ).includes(noteIndex) && "bg-[#0003]",
            ])}
          >
            {note}
          </span>
        ))}
      </div>
    ))}
  </div>
);

const MemoBars = memo(
  Bars,
  (prev, next) => prev.id === next.id && prev.activeIndex === next.activeIndex
);
