import { ComponentProps, FC, ReactNode } from "react";

type Props = {
  label?: ReactNode;
  className?: string;
} & (InputProps | TextareaProps);

type InputProps = {
  textarea?: false;
} & ComponentProps<"input">;

type TextareaProps = {
  textarea: true;
} & ComponentProps<"textarea">;

export const Input: FC<Props> = ({
  label,
  className,
  textarea = false,
  ...inputProps
}) => {
  const inputClasses = [
    "bg-white border border-slate-200 size-16 text-lg text-slate-700 tracking-wide p-2 rounded-md w-full hover:border-slate-400 focus:border-slate-700 focus:outline-none transition-colors",
    className,
  ].join(" ");

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
