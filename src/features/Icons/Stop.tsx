import { Icon } from "./types";

export default (props: Icon) => () =>
  (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#F9C926" />
    </svg>
  );
