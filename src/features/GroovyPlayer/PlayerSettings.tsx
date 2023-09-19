import { Button } from "@/features";
import { usePlayerSettings } from "./PlayerSettingsContext";
import { ComponentProps, FC } from "react";
import { CloseIcon } from "../Icons";
import { cx } from "@/utils";

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
        <label className="cursor-pointer p-2 w-full flex leading-loose hover:bg-whitey/10 rounded-md">
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
