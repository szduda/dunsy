import { ComponentProps, FC } from "react";

export type Icon = FC<ComponentProps<"svg">>;
export type FancyIconProps = ComponentProps<"svg"> & {
  innerClass?: string;
  innerClass2?: string;
};
export type FancyIcon = FC<FancyIconProps>;
