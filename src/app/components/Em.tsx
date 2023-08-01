import { ComponentProps, FC } from "react";

export const Em: FC<ComponentProps<"span">> = (props) => (
  <span className="bg-amber-200 text-gray-700 mx-1 p-1" {...props} />
);
