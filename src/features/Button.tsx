import { ComponentProps, FC } from "react";

export const Button: FC<ComponentProps<"button">> = ({
  className,
  children,
  ...props
}) => (
  <button
    className={[
      "border rounded-md",
      "w-full md:min-w-[240px] md:w-fit hover:bg-orange-500 transition-colors",
      props.disabled ? "bg-gray-600 pointer-events-none" : "bg-orange-600",
      className,
    ].join(" ")}
    {...props}
  >
    <div className="px-4 py-3 text-white tracking-wider variant-small-caps font-semibold transition duration-300 delay-100 hover:scale-110">
      {children}
    </div>
  </button>
);
