import React from "react";
import cx from "classnames";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}
export const TextButton = ({ children, onClick, active }: Props) => {
  return (
    <div
      className={cx("rounded px-2 cursor-pointer font-bold", {
        "underline hover:text-blue-700": active,
        "text-blue-500": active,
        "text-gray-700 hover:text-blue-500": !active,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
