import React from "react";
import cx from "classnames";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}
export const TextButton = ({ children, onClick, active, className }: Props) => {
  return (
    <div
      className={cx(
        "rounded pr-2 cursor-pointer font-bold",
        {
          "underline hover:text-blue-700": active,
          "text-blue-500": active,
          "text-gray-700 hover:text-blue-500": !active,
        },
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
