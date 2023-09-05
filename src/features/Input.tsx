import { cx } from "@/utils";
import { ComponentProps, FC, ReactNode } from "react";

type Props = {
  mini?: boolean;
  label?: ReactNode;
  className?: string;
  black?: boolean;
} & (InputProps | TextareaProps);

type InputProps = {
  textarea?: false;
} & ComponentProps<"input">;

type TextareaProps = {
  textarea: true;
} & ComponentProps<"textarea">;

export const Input: FC<Props> = ({
  mini = false,
  black = false,
  label,
  className,
  textarea = false,
  ...inputProps
}) => {
  const inputClasses = cx([
    black
      ? "bg-black text-white border-slate-500 hover:border-slate-400 focus:border-slate-200 py-3"
      : "bg-white text-slate-700 border-slate-200 hover:border-slate-400 focus:border-slate-700",
    "border size-16 text-lg tracking-wide p-2 rounded-md focus:outline-none transition-colors",
    !mini && "w-full",
    className,
  ]);

  return (
    <label>
      {label && (
        <div className="text-slate-500 text-sm font-semibold tracking-wider mb-2 uppercase">
          {label}
        </div>
      )}
      {textarea ? (
        <textarea
          className={inputClasses}
          {...(inputProps as ComponentProps<"textarea">)}
        />
      ) : (
        <input
          className={inputClasses}
          type="text"
          {...(inputProps as ComponentProps<"input">)}
        />
      )}
    </label>
  );
};
