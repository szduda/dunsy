import { cx } from "@/utils";
import { ComponentProps, FC } from "react";

type Props = ComponentProps<"button"> & {
  mini?: boolean;
  black?: boolean;
  ninja?: boolean;
  on?: boolean;
  colorClasses?: string;
  circle?: boolean;
  padding?: string;
};

export const Button: FC<Props> = ({
  mini = false,
  black = false,
  ninja = false,
  on = false,
  className,
  colorClasses = "bg-redy-dark hover:bg-redy text-white",
  circle,
  padding = "p-3",
  children,
  ...props
}) => (
  <button
    className={cx([
      "transition-all ease-in-out border",
      props.disabled
        ? "bg-graye opacity-25 text-graye-light pointer-events-none border-transparent"
        : black
        ? "bg-black text-white border-transparent hover:bg-graye-darkest active:scale-90"
        : colorClasses,
      on && !props.disabled && !ninja
        ? "border-yellowy scale-95"
        : "border-transparent",
      ninja ? (on && !props.disabled ? "saturate-100" : "saturate-0") : "",
      mini ? "w-min" : " w-full md:min-w-[240px] md:w-fit",
      circle ? "rounded-full" : "rounded-md",
      ninja &&
        "bg-transparent hover:bg-transparent hover:scale-110 active:scale-95",
      className,
    ])}
    {...props}
  >
    <div
      className={cx([
        "transition-all tracking-wider variant-small-caps font-semibold",
        padding,
        mini ? "" : "hover:scale-110",
      ])}
    >
      {children}
    </div>
  </button>
);
