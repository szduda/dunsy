import { FC } from "react";

type Props = {
  label: string;
  name: string;
  items: Record<string, string>;
};

export const Radios: FC<Props> = ({ name, items, label }) => {
  return (
    <fieldset>
      {label && (
        <div className="text-gray-500 text-sm font-semibold tracking-wider mb-2 uppercase">
          {label}
        </div>
      )}
      {Object.keys(items).map((value) => (
        <label key={value} className="p-2 mt-2 text-lg flex items-center">
          <input type="radio" name={name} id={name} className="w-5 h-5 mr-2" />

          {items[value]}
        </label>
      ))}
    </fieldset>
  );
};
