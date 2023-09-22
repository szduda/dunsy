import { ComponentProps, FC, useState } from "react";

import { PlayerControls } from "./PlayerControls";
import { Track } from "./Track";
import { useGroovyPlayer } from "./useGroovyPlayer";
import { SwingStyle } from "../SnippetApi/types";
import { TTrack } from "./types";
import { Button } from "@/features/rsc";
import { cx } from "@/utils";
import { PlayerSettings } from "./PlayerSettings";
import { PlayerSettingsProvider } from "./PlayerSettingsContext";
import { GearIcon } from "../Icons";

export type Props = ComponentProps<"div"> & {
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
  ...divProps
}) => {
  const { muted, setMuted, loopLength, beat, ...rest } = useGroovyPlayer({
    tracks,
    initialMetronome,
    initialTempo,
    swingStyle,
  });

  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Wrapper {...divProps}>
      <div
        className={cx([
          "transition-all ease-in-out",
          settingsOpen && "blur-sm brightness-75 pointer-events-none",
        ])}
      >
        <div className="pr-4 pl-8 py-4 flex justify-between items-center text-3xl">
          <div
            className="text-greeny-darker tracking-tighter opacity-50"
            style={{ textShadow: "0 0 2px #000" }}
          >
            GroovyPlayer
          </div>
          <Button
            mini
            ninja
            padding="0"
            className="text-4xl leading-3 bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              setSettingsOpen(true);
            }}
          >
            <GearIcon className="hover:animate-spin-once border-box p-1" />
          </Button>
        </div>
        {tracks.length
          ? tracks.map(({ title, instrument, pattern }, index) => (
              <Track
                key={`${title}${index}`}
                title={title}
                beat={beat}
                instrument={instrument}
                pattern={pattern?.repeat(loopLength / pattern.length)}
                muted={muted[instrument]}
                setMuted={(value) =>
                  setMuted({ ...muted, [instrument]: value })
                }
              />
            ))
          : [...Array(3)].map((_, i) => <Track key={`track-${i}`} />)}

        <PlayerControls
          {...{ disabled: !tracks.length, swingStyle, ...rest }}
        />
      </div>
      <PlayerSettings
        onClose={() => setSettingsOpen(false)}
        className={cx([
          "transition ease-in-out duration-300",
          settingsOpen
            ? "translate-x-0"
            : "translate-x-16 pointer-events-none opacity-0",
        ])}
      />
    </Wrapper>
  );
};

const Wrapper: FC<ComponentProps<"div">> = ({
  className,
  children,
  ...props
}) => (
  <div
    {...props}
    className={cx([
      "overflow-hidden w-full lg:rounded-lg bg-blacky text-whitey font-bold text-md leading-normal relative",
      className,
    ])}
  >
    <PlayerSettingsProvider>{children}</PlayerSettingsProvider>
  </div>
);
