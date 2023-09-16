import { ComponentProps, FC } from "react";

export type Icon = FC<ComponentProps<"svg">>;
export type FancyIcon = FC<
  ComponentProps<"svg"> & {
    innerClass?: string;
    innerClass2?: string;
  }
>;
