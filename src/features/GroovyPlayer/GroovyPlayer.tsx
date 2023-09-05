import { ComponentProps, FC, useState } from "react";

import { PlayerControls } from "./PlayerControls";
import { Track } from "./Track";
import { useGroovyPlayer } from "./useGroovyPlayer";
import { SwingStyle } from "../SnippetApi/types";
import { TTrack } from "./types";
import { Button, Input } from "..";
import { cx } from "@/utils";

export type Props = {
  tracks: TTrack[];
  swingStyle?: SwingStyle;
  metronome?: boolean;
  tempo?: number;
};

export const GroovyPlayer: FC<Props> = ({
  tracks,
  swingStyle = "",
  metronome: initialMetronome = true,
  tempo: initialTempo = 110,
}) => {
  const { muted, setMuted, loopLength, beat, ...rest } = useGroovyPlayer({
    tracks,
    initialMetronome,
    initialTempo,
    swingStyle,
  });

  const [videoSync, setVideoSync] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Wrapper>
      <div
        className={cx([
          "transition-all ease-in-out",
          settingsOpen &&
            "blur-md contrast-50 brightness-75 pointer-events-none",
        ])}
      >
        <div className="px-1 py-4 lg:px-8 flex justify-end items-center text-3xl">
          <Button
            mini
            black
            className="leading-3 min-w-[58px] bg-transparent -mr-3"
            onClick={(e) => {
              e.preventDefault();
              setSettingsOpen(true);
            }}
          >
            <span className="text-neutral-700 tracking-tighter">
              GroovyPlayer
            </span>
          </Button>
        </div>
        {tracks.length
          ? tracks.map(({ title, instrument, pattern }, index) => (
              <Track
                key={`${title}${instrument}${index}`}
                {...{
                  title,
                  beat: beat - videoSync,
                  pattern: pattern?.repeat(loopLength / pattern.length),
                  muted: muted[instrument],
                  setMuted: (value) =>
                    setMuted({ ...muted, [instrument]: value }),
                }}
              />
            ))
          : [...Array(3)].map((_, i) => <Track key={`track-${i}`} />)}

        <PlayerControls
          {...{ disabled: !tracks.length, swingStyle, ...rest }}
        />
      </div>
      {/* settings modal */}
      {settingsOpen && (
        <div className="absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 p-2 lg:px-4 lg:pb-3 bg-black rounded-lg min-w-[280px]">
          <div className="flex justify-end items-center text-xl">
            <span className="text-neutral-700 tracking-tighter pr-4 flex-1">
              Player Settings
            </span>
            <Button
              className="-mr-2"
              mini
              black
              onClick={(e) => {
                e.preventDefault();
                setSettingsOpen(false);
              }}
            >
              {"\u2715"}
            </Button>
          </div>
          <div>
            <Input
              label="Audio/Video sync"
              mini
              className="w-[58px]"
              value={videoSync * 50}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (Number.isInteger(val)) {
                  setVideoSync(val / 50);
                }
              }}
            />
            <span className="pl-2 opacity-25">100 = 1 bar</span>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper: FC<ComponentProps<"div">> = (props) => (
  <div
    className="-mx-2 lg:-mx-24 w-fill lg:rounded-b-lg w-fill bg-neutral-600 text-neutral-300 font-bold text-md leading-normal relative"
    {...props}
  />
);
