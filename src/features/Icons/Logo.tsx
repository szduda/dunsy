import { FC } from "react";
import { FancyIconProps } from "./types";

export const LogoIcon: FC<FancyIconProps & { onStickClick(): void }> = ({
  onStickClick,
  innerClass,
  innerClass2,
  ...props
}) => (
  <svg
    height="36"
    viewBox="-4 0 76 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Website logo: two dundun drums pictured from above with a stick over the bigger drum on the right."
    {...props}
  >
    <g clipPath="url(#clip0_24_121)">
      <circle cx="48" cy="26" r="18.5" stroke="#f9c926aa" strokeWidth="3" />
      <circle
        cx="48"
        cy="26"
        r="14"
        fill="#f9c92644"
        stroke="#f9c926aa"
        className={innerClass2}
      />
      <circle cx="13" cy="27" r="11.5" stroke="#f9c926aa" strokeWidth="3" />
      <circle cx="13" cy="27" r="8" fill="#f9c92644" stroke="#f9c926aa" />
      <g className={innerClass}>
        <rect
          x="43.5661"
          y="29.2281"
          width="36.8182"
          height="4"
          rx="2"
          transform="rotate(-137.518 43.5661 29.2281)"
          // fill="#f9c926"
          fill="#455F5D"
          stroke="#121211AA"
          strokeWidth="1"
          onClick={onStickClick}
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_24_121"
        x="66.3359"
        y="13.1621"
        width="155.728"
        height="37.4902"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_24_121"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_24_121"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_24_121">
        <rect width="220" height="46" fill="#f9c926aa" />
      </clipPath>
    </defs>
  </svg>
);
