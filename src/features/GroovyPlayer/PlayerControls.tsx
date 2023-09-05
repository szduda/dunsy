import { FC, ReactNode } from "react";
import { SwingStyle } from "../SnippetApi/types";
import { Button, Input } from "..";
import { cx } from "@/utils";

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
        {"\u23F5"}
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
        {"\u23F9"}
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
        onChange={(e) => {
          const value = Number(e.target.value);
          if (isNaN(value)) return;

          setTempo(value);
        }}
      />
      <div>BPM</div>
    </div>

    <Button
      mini
      black
      on={signalActive || signalRequested}
      className={cx([buttonClassName])}
      disabled={disabled}
      aria-label="Play signal"
      onClick={(e) => {
        e.preventDefault();
        playSignal();
      }}
    >
      <div className={signalActive && playing ? "animate-bounce" : ""}>
        {"\u26A0"}
      </div>
    </Button>

    <Button
      mini
      black
      on={metronome}
      className={buttonClassName}
      disabled={disabled}
      aria-label={`turn metronome ${metronome ? "off" : "on"}`}
      onClick={(e) => {
        e.preventDefault();
        setMetronome(!metronome);
      }}
    >
      <div className={metronome && playing ? "animate-spin" : ""}>
        {"\u262F"}
      </div>
    </Button>

    <Button
      mini
      black
      on={swing}
      className={buttonClassName}
      disabled={disabled || !swingStyle}
      aria-label={`turn swing ${swing ? "off" : "on"}`}
      onClick={(e) => {
        e.preventDefault();
        setSwing(!swing);
      }}
    >
      <div className={swing && playing ? "animate-shake" : ""}>
        {"\u26D0"}
      </div>
    </Button>
  </Wrapper>
);

const buttonClassName = "mr-1 md:mr-2 mb-2 text-3xl leading-7 min-w-[58px]";

const Wrapper: FC<{ children: ReactNode }> = (props) => (
  <div
    className="flex justify-between items-center flex-wrap w-full px-1 md:px-3 pb-1 pt-2 md:pt-4 md:pb-2 lg:px-8 lg:pb-3"
    {...props}
  />
);
