import { ComponentProps, FC, useState } from "react";

import { PlayerControls } from "./PlayerControls";
import { Track } from "./Track";
import { useGroovyPlayer } from "./useGroovyPlayer";
import { SwingStyle } from "../SnippetApi/types";
import { TTrack } from "./types";
import { Button } from "..";
import { cx } from "@/utils";
import { PlayerSettings } from "./PlayerSettings";
import { PlayerSettingsProvider } from "./PlayerSettingsContext";

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
        <div className="px-1 md:px-3 lg:px-8 py-4 flex justify-between items-center text-3xl">
          <div className="text-greeny-darker tracking-tighter opacity-50">
            GroovyPlayer
          </div>
          <Button
            mini
            black
            className="min-w-[58px] text-4xl leading-3 bg-transparent -mr-4 hover:bg-greeny-dark"
            onClick={(e) => {
              e.preventDefault();
              setSettingsOpen(true);
            }}
          >
            <div className="-translate-y-0.5 text-graye-darker">{"\u2699"}</div>
          </Button>
        </div>
        {tracks.length
          ? tracks.map(({ title, instrument, pattern }, index) => (
              <Track
                key={`${title}${index}`}
                title={title}
                beat={beat}
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
      {settingsOpen && (
        <PlayerSettings onClose={() => setSettingsOpen(false)} />
      )}
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
