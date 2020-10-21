import React from "react";
import cx from "classnames";
interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
export const OutlineButton = (props: Props) => (
  <div
    className={cx(
      "inline-flex font-bold items-center px-2 py-1 text-gray-500 hover:text-blue-500 cursor-pointer",
      props.className
    )}
    onClick={props.onClick}
  >
    {props.children}
  </div>
);
