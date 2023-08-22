import { ChangeEvent, ComponentProps, FC } from "react";

type Props = {
  label: string;
  items: Record<string, string>;
  value?: string;
  onChange(value: string): void;
} & Omit<ComponentProps<"input">, "value" | "onChange">;

export const Radios: FC<Props> = ({
  items,
  label,
  value,
  onChange,
  ...rest
}) => {
  return (
    <fieldset>
      {label && (
        <div className="text-gray-500 text-sm font-semibold tracking-wider mb-2 uppercase">
          {label}
        </div>
      )}
      {Object.keys(items).map((myValue) => (
        <label key={myValue} className="p-2 mt-2 text-lg flex items-center">
          <input
            type="radio"
            id={rest.id || rest.name}
            className="w-5 h-5 mr-2"
            checked={value === myValue}
            onChange={(e) => e.target.checked && onChange?.(myValue)}
            {...rest}
          />

          {items[myValue]}
        </label>
      ))}
    </fieldset>
  );
};
