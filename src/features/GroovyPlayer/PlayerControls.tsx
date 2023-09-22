import { FC, ReactNode } from "react";
import { SwingStyle } from "../SnippetApi/types";
import { Button, Input } from "@/features/rsc";
import { cx } from "@/utils";
import {
  PepperIcon,
  PlayIcon,
  RestartIcon,
  ShekereIcon,
  SignalIcon,
  StopIcon,
} from "../Icons";

export type Props = {
  playLoop(): void;
  stopLoop(): void;
  playing: boolean;
  metronome: boolean;
  setMetronome(arg: boolean): void;
  tempo: number;
  setTempo(arg: number): void;
  disabled: boolean;
  swing: boolean;
  setSwing(arg: boolean): void;
  swingStyle: SwingStyle;
  playSignal(): void;
  signalActive: boolean;
  signalRequested: boolean;
};

export const PlayerControls: FC<Props> = ({
  playLoop,
  stopLoop,
  playing,
  metronome,
  setMetronome,
  tempo,
  setTempo,
  disabled,
  swing,
  setSwing,
  swingStyle,
  playSignal,
  signalActive,
  signalRequested,
}) => (
  <Wrapper>
    <div className="flex w-full md:w-fit">
      <Button
        mini
        black
        on={playing}
        className={buttonClassName}
        aria-label={playing ? "Restart" : "Play"}
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          playLoop();
        }}
      >
        {playing ? (
          <RestartIcon className="mx-auto" />
        ) : (
          <PlayIcon className="mx-auto" />
        )}
      </Button>
      <Button
        mini
        black
        className={buttonClassName}
        aria-label="Stop"
        disabled={disabled}
        onClick={(e) => {
          e.preventDefault();
          stopLoop();
        }}
      >
        <StopIcon className="mx-auto" />
      </Button>
    </div>
    <div className="md:ml-6 mb-2 lg:mx-8 flex items-center flex-1 flex-nowrap">
      <Input
        mini
        black
        className="mr-2 w-[58px] text-center"
        type="text"
        maxLength={3}
        value={tempo}
        disabled={disabled}
        onFocus={(e) => e.target.select()}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (isNaN(value)) {
            return;
          }

          setTempo(value);
          if (value >= 60 && value <= 200) {
            setTimeout(playLoop, 0);
          }
        }}
      />
      <div>BPM</div>
    </div>

    <Button
      mini
      ninja
      circle
      on={signalActive || signalRequested}
      className={cx([buttonClassName])}
      disabled={disabled}
      aria-label="Play signal"
      onClick={(e) => {
        e.preventDefault();
        playSignal();
      }}
    >
      <SignalIcon
        innerClass2={cx([
          (signalActive || signalRequested) &&
            playing &&
            "animate-ping origin-center",
        ])}
      />
    </Button>

    <Button
      mini
      ninja
      circle
      on={metronome}
      className={cx([
        buttonClassName,
        metronome && playing ? "animate-shake" : "",
      ])}
      disabled={disabled}
      aria-label={`turn metronome ${metronome ? "off" : "on"}`}
      onClick={(e) => {
        e.preventDefault();
        setMetronome(!metronome);
      }}
    >
      <ShekereIcon />
    </Button>

    <Button
      mini
      circle
      ninja
      on={swing}
      className={cx([buttonClassName, swing && playing ? "animate-spin" : ""])}
      disabled={disabled || !swingStyle}
      aria-label={`turn swing ${swing ? "off" : "on"}`}
      onClick={(e) => {
        e.preventDefault();
        setSwing(!swing);
      }}
    >
      <PepperIcon />
    </Button>
  </Wrapper>
);

const buttonClassName = "mr-1 md:mr-2 mb-2 min-w-[54px]";

const Wrapper: FC<{ children: ReactNode }> = (props) => (
  <div
    className="flex justify-between items-center flex-wrap w-full pl-1 pb-1 pt-4 md:pl-3 md:pb-2 lg:pl-8 lg:pr-2"
    {...props}
  />
);
