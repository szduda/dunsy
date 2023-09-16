import { FC } from "react";
import { LogoIcon } from "@/features/Icons";
import { Icon } from "../Icons/types";

export const Logo: Icon = (props) => (
  <div className="flex items-center scale-75 md:scale-100">
    <LogoIcon height={128} innerClass2="animate-dundun origin-center" {...props} />
    <h1 className="font-black text-5xl text-graye tracking-wide">
      dunsy<small className="text-2xl opacity-50">.app</small>
    </h1>
  </div>
);
