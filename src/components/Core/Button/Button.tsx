import React from "react";
import cx from "classnames";
interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
export const Button = (props: Props) => {
  return (
    <div
      className={cx(
        "inline-flex font-bold items-center rounded border px-2 py-1 bg-blue-500 text-blue-100 hover:bg-blue-700 hover:text-blue-200 cursor-pointer",
        props.className
      )}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
