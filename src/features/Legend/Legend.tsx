import { cx } from "@/utils";
import { ComponentProps, FC, ReactNode } from "react";

type Props = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  padding?: string;
} & (
    | {
        leftCol: ReactNode;
        icon?: never;
      }
    | {
        leftCol?: never;
        icon: ReactNode;
      }
  );

export const Legend: FC<Props> = ({
  icon,
  title,
  description,
  className,
  leftCol,
}) => (
  <div
    className={cx([
      "flex items-center w-full mt-24 md:mt-12 flex-wrap md:flex-nowrap justify-center pt-10 px-1 lg:px-0",
      className,
    ])}
  >
    {leftCol || (
      <div className="border bg-yellowy-light/5 border-yellowy-light/25 rounded-full p-2 min-w-[256px] max-w-[256px] h-[256px] flex items-center justify-center">
        {icon}
      </div>
    )}
    <div className="md:ml-16 mt-12 md:mt-0 w-full">
      <h3 className="text-3xl drop-shadow-lg text-graye tracking-wide font-bold">
        {title}
      </h3>
      <div className="mt-2 tracking-wide">{description}</div>
    </div>
  </div>
);
