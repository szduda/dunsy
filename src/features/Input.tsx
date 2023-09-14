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
    "border size-16 text-lg tracking-wide p-2 rounded-md focus:outline-none transition-all ease-in-out",
    black
      ? "bg-blacky text-whitey border-graye-darker hover:border-graye-dark focus:border-graye py-3"
      : "bg-greeny-darker text-whitey border-graye-dark hover:border-graye focus:border-graye-light",
    !mini && "w-full",
    !inputProps.value && "opacity-50",
    className,
  ]);

  return (
    <label>
      {label && (
        <div className="text-graye text-sm font-semibold tracking-wider mb-2 uppercase">
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
