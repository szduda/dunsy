import { FancyIcon } from "./types";

export const DundunIcon: FancyIcon = ({
  innerClass,
  innerClass2,
  ...props
}) => (
  <svg
    width="128"
    height="128"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx="31.5"
      cy="21.5"
      r="17.5"
      transform="rotate(90 31.5 21.5)"
      fill="#F9C926"
      className={innerClass}
    />
    <circle
      cx="31.5"
      cy="21.5"
      r="13"
      transform="rotate(90 31.5 21.5)"
      stroke="#330000"
      strokeOpacity="0.25"
      strokeWidth="9"
      className={innerClass}
    />
    <line
      x1="12.2291"
      y1="59.6045"
      x2="49.6045"
      y2="32.7709"
      stroke="#DBA906"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="13.4117"
      y1="32.7504"
      x2="50.7566"
      y2="59.6263"
      stroke="#DBA906"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
