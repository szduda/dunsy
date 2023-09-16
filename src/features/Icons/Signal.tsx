import { FancyIcon, Icon } from "./types";

export const SignalIcon: FancyIcon = ({
  innerClass,
  innerClass2,
  ...props
}) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.5 2H25.5C25 9.5 24.7493 11.5055 24.5 13.5C24 17.5 23.5 18.5 23.5 18.5C23.5 18.5 23 19.5 21.5 19.7692C21.2222 27 22 30 23.5 35H11C12.8056 28.5 12.5648 22.0128 12.5 19.7692C11.7985 19.7692 11 19 11 19C10 18 10 17.5 9.5 15C9 11.5 9 11.5 8.5 2.50001L8.5 2.5C8.46679 2.00645 8.53376 2.52196 8.5 2Z"
      fill="#F9C926"
      className={innerClass}
    />
    <path
      d="M12.5 19.7692C11.7985 19.7692 11 19 11 19C10 18 10 17.5 9.5 15C9 11.5 9 11.5 8.5 2.5C8.46679 2.00645 8.53376 2.52196 8.5 2H25.5M12.5 19.7692C13.2015 19.7692 17.0278 19.7692 17.0278 19.7692H21.5M12.5 19.7692C12.5648 22.0128 12.8056 28.5 11 35H23.5C22 30 21.2222 27 21.5 19.7692M21.5 19.7692C23 19.5 23.5 18.5 23.5 18.5C23.5 18.5 24 17.5 24.5 13.5C24.7493 11.5055 25 9.5 25.5 2M25.5 2C25.5 0.999998 25.5 2.5 25.5 2Z"
      stroke="#1B1B1A"
      strokeWidth="0.5"
      className={innerClass}
    />
    <path
      d="M32.753 8.26819L29.3543 21.5634L25.9196 20.8227L28.3025 7.30843L32.753 8.26819ZM24.3951 24.8436C24.5239 24.2467 24.8463 23.7894 25.3623 23.4718C25.8784 23.1541 26.4883 23.0712 27.1922 23.223C27.8872 23.3729 28.3998 23.6979 28.7302 24.1981C29.0695 24.7001 29.1748 25.2497 29.046 25.8466C28.9154 26.4525 28.592 26.9142 28.0759 27.2318C27.5707 27.5425 26.9706 27.6228 26.2757 27.473C25.5718 27.3212 25.0493 26.9987 24.7081 26.5055C24.3688 26.0034 24.2645 25.4495 24.3951 24.8436Z"
      fill="#F9C926"
      className={innerClass2}
    />
  </svg>
);
