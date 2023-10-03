import { FC } from "react";

type Props = {
  pattern: string;
  barSize: number;
  factor: boolean;
};

export const PatternHint: FC<Props> = ({
  pattern,
  barSize,
  factor = true,
}) => (
  <>
    {pattern.length} notes
    {pattern.length % barSize === 0 && factor ? (
      <span className="text-greeny-light pl-2">{"\u2713"}</span>
    ) : (
      <span className="text-redy-light pl-2">{"\u2717"}</span>
    )}
  </>
);
