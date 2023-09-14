import { Button } from "@/features";
import { usePlayerSettings } from "./PlayerSettingsContext";
import { FC } from "react";

type Props = {
  onClose(): void;
};

export const PlayerSettings: FC<Props> = ({ onClose }) => {
  const { largeBars, videoSync, setLargeBars, setVideoSync } =
    usePlayerSettings();
  return (
    <div className="absolute top-0 right-0 px-2 py-4 lg:pl-6 lg:pr-8 bg-graye-darkest md:rounded-bl-lg min-w-[280px] w-full md:w-auto">
      <div className="flex justify-end items-center text-xl">
        <div className="text-graye-light pl-2 pr-4 flex-1">Player Settings</div>
        <Button
          className="-mr-2 leading-3"
          mini
          circle
          ninja
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          {"\u2715"}
        </Button>
      </div>
      <div className="pt-4 pr-2 font-normal">
        <label className="cursor-pointer p-2 w-full flex leading-loose hover:bg-[#FFF2] rounded-md">
          <input
            className="flex w-[20px]"
            type="checkbox"
            checked={videoSync}
            onChange={(e) => setVideoSync(e.target.checked)}
          />
          <div className="pl-3">My bluetooth audio is delayed</div>
        </label>
        <label className="cursor-pointer p-2 w-full flex leading-loose hover:bg-[#FFF2] rounded-md">
          <input
            className="flex w-[20px]"
            type="checkbox"
            checked={largeBars}
            onChange={(e) => setLargeBars(e.target.checked)}
          />
          <div className="pl-3">Enlarge bars</div>
        </label>
      </div>
    </div>
  );
};
