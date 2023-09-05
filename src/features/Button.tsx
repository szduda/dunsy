import { cx } from "@/utils";
import { ComponentProps, FC } from "react";

export const Button: FC<
  ComponentProps<"button"> & { mini?: boolean; black?: boolean; on?: boolean }
> = ({
  mini = false,
  black = false,
  on = false,
  className,
  children,
  ...props
}) => (
  <button
    className={cx([
      "rounded-md transition-all ease-in-out border",
      black ? "hover:bg-neutral-800 active:scale-90" : "hover:bg-orange-500",
      props.disabled
        ? "bg-neutral-700 text-neutral-500 pointer-events-none border-transparent"
        : black
        ? "bg-black text-white border-transparent"
        : "bg-orange-600 text-white",
      on && !props.disabled
        ? "border-yellow-400 scale-95"
        : "border-transparent",
      mini ? "w-min" : " w-full md:min-w-[240px] md:w-fit",
      className,
    ])}
    {...props}
  >
    <div
      className={cx([
        "transition-all px-4 py-3 tracking-wider variant-small-caps font-semibold",
        mini ? "" : "hover:scale-110",
      ])}
    >
      {children}
    </div>
  </button>
);
