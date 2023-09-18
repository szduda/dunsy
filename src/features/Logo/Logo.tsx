import { LogoIcon, DundunSetIcon } from "@/features/Icons";
import { Icon } from "../Icons/types";
import { cx } from "@/utils";
import { useEffect, useState } from "react";

export const Logo: Icon = (props) => {
  const [dundunTime, itsDundunTime] = useState(false);
  let timeout: NodeJS.Timeout | null;

  useEffect(
    () => () => {
      if (timeout) clearTimeout(timeout);
    },
    []
  );

  return (
    <div className="flex items-center scale-75 md:scale-100">
      <div className="relative">
        <DundunSetIcon
          height={128}
          innerClass2="animate-dundun origin-center"
          {...props}
          className={cx([
            props.className,
            !dundunTime
              ? "opacity-0 pointer-events-none"
              : "animate-spin-logo-once",
            "absolute origin-center transition-all duration-500 -rotate-[30deg]",
          ])}
        />
        <LogoIcon
          height={128}
          innerClass2="animate-dundun origin-center"
          {...props}
          className={cx([
            props.className,
            dundunTime && "opacity-0",
            "origin-center hover:animate-spin-logo transition-all duration-500",
          ])}
          onMouseEnter={(e) => {
            if (timeout) return;

            timeout = setTimeout(() => {
              itsDundunTime(true);
            }, 3300);
          }}
          onMouseLeave={() => {
            if (timeout) {
              clearTimeout(timeout);
            }
            timeout = null;
          }}
        />
      </div>
      <h1
        className={cx([
          "font-black text-5xl text-graye tracking-wide transition duration-500 ease-in-out",
          dundunTime && "translate-y-12 -translate-x-1",
        ])}
      >
        dunsy<small className="text-2xl opacity-50">.app</small>
      </h1>
    </div>
  );
};
