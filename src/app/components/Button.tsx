import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = (props) => (
  <button
    className="border bg-sky-800 text-white tracking-wider variant-small-caps font-semibold rounded-md px-4 py-3 w-full min-w-[240px] md:w-fit hover:bg-sky-700"
    {...props}
  />
);
