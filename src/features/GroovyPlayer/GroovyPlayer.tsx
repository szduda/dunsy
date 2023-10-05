import { ComponentProps, FC, useState } from "react";
import { PlayerControls } from "./PlayerControls";
import { Track } from "./Track";
import { useGroovyPlayer } from "./useGroovyPlayer";
import { SwingStyle } from "../SnippetApi/types";
import { TTrack } from "./types";
import { cx } from "@/utils";
import {
  AVSyncLabel,
  LargeBarsLabel,
  PlayerSettings,
  SettingsButton,
} from "./PlayerSettings";
import { PlayerSettingsProvider } from "./PlayerSettingsContext";

export type Props = ComponentProps<"div"> & {
  tracks: TTrack[];
  swingStyle?: SwingStyle;
  signal?: string;
  metronome?: boolean;
  tempo?: number;
};

export const GroovyPlayer: FC<Props> = ({
  tracks,
  swingStyle = "",
  signal,
  metronome: initialMetronome = true,
  tempo: initialTempo = 110,
  ...divProps
}) => {
  const { muted, setMuted, loopLength, beat, ...rest } = useGroovyPlayer({
    tracks,
    initialMetronome,
    initialTempo,
    swingStyle,
    signal,
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
          <div className="flex">
            <div className="hidden md:grid grid-cols-2 gap-1 mx-4">
              <LargeBarsLabel />
              <AVSyncLabel />
            </div>
            <SettingsButton
              className="md:hidden"
              onClick={() => setSettingsOpen(true)}
            />
          </div>
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
