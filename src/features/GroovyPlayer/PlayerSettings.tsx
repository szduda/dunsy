import { ComponentProps, FC } from "react";
import { Button } from "@/features/rsc";
import { CloseIcon, GearIcon } from "@/features/Icons";
import { cx } from "@/utils";
import { usePlayerSettings } from "./PlayerSettingsContext";

export const AVSyncLabel: FC<ComponentProps<"button">> = (props) => {
  const { videoSync, setVideoSync } = usePlayerSettings();
  return (
    <button
      {...props}
      onClick={(e) => {
        e.preventDefault();
        setVideoSync(!videoSync);
        props.onClick?.(e);
      }}
      className={cx([
        "text-sm px-2 h-min rounded-full text-blacky transition active:scale-95 border border-1 border-graye-dark",
        videoSync
          ? "bg-greeny hover:bg-greeny-lighter"
          : "bg-graye-dark hover:bg-graye",
        props.className,
      ])}
    >
      A/V Sync
    </button>
  );
};

export const LargeBarsLabel: FC<ComponentProps<"button">> = (props) => {
  const { largeBars, setLargeBars } = usePlayerSettings();
  return (
    <button
      {...props}
      onClick={(e) => {
        e.preventDefault();
        setLargeBars(!largeBars);
        props.onClick?.(e);
      }}
      className={cx([
        "text-sm px-2 h-min rounded-full text-blacky transition active:scale-95 border border-1 border-graye-dark",
        largeBars
          ? "bg-greeny hover:bg-greeny-lighter"
          : "bg-graye-dark hover:bg-graye",
        props.className,
      ])}
    >
      Zoom
    </button>
  );
};

export const SettingsButton: FC<ComponentProps<"button">> = (props) => {
  const { largeBars, videoSync } = usePlayerSettings();

  return (
    <Button
      mini
      ninja
      padding="0"
      on
      className="text-4xl leading-3 bg-transparent"
      {...props}
      onClick={(e) => {
        e.preventDefault();
        props.onClick?.(e);
      }}
    >
      <div className="relative">
        <GearIcon className="hover:animate-spin-once border-box p-1" />
        {(largeBars || videoSync) && (
          <div className="absolute right-0 top-0 w-2 h-2 rounded-full bg-yellowy md:hidden" />
        )}
      </div>
    </Button>
  );
};

type Props = ComponentProps<"div"> & {
  onClose(): void;
};

export const PlayerSettings: FC<Props> = ({ onClose, className }) => {
  const { largeBars, videoSync, setLargeBars, setVideoSync } =
    usePlayerSettings();
  return (
    <div
      className={cx([
        "absolute top-0 right-0 pl-4 pr-2 pt-2 lg:pt-3 pb-4 lg:pl-5 lg:pr-3 bg-graye-darkest md:rounded-bl-lg min-w-[280px] w-full md:w-auto",
        className,
      ])}
    >
      <div className="flex justify-end items-center text-xl">
        <div className="text-graye-light pl-2 pr-4 flex-1">Player Settings</div>
        <Button
          className="-mr-1 leading-3 fill-whitey hover:bg-whitey/10"
          mini
          circle
          ninja
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <CloseIcon />
        </Button>
      </div>
      <div className="pt-4 pr-2 font-normal">
        <label className="cursor-pointer p-2 w-full flex leading-loose hover:bg-whitey/10 rounded-md">
          <input
            className="flex w-[20px]"
            type="checkbox"
            checked={largeBars}
            onChange={(e) => setLargeBars(e.target.checked)}
          />
          <div className="pl-3">Zoom In</div>
        </label>
        <label className="cursor-pointer p-2 w-full flex hover:bg-whitey/10 rounded-md">
          <input
            className="flex w-[20px]"
            type="checkbox"
            checked={videoSync}
            onChange={(e) => setVideoSync(e.target.checked)}
          />
          <div className="pl-3">
            <div>Audio/Video Sync</div>
            <small className="opacity-75">
              (beta) use when your bluetooth audio is delayed
            </small>
          </div>
        </label>
      </div>
    </div>
  );
};
