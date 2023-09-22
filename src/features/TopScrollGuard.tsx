import { FC, useEffect } from "react";

export const TopScrollGuard: FC<{ top: number }> = ({ top }) => {
  useEffect(() => {
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return null;
};
