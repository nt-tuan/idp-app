import React from "react";
import cx from "classnames";
interface MenuItemProps {
  selected?: boolean;
  onClick?: () => void;
  content: React.ReactNode;
  info?: React.ReactNode;
  rightContent?: React.ReactNode;
  className?: string;
}
export const MenuItem = (props: MenuItemProps) => {
  return (
    <div
      className={cx(
        "py-2 cursor-pointer",
        {
          shadow: props.selected,
          "bg-blue-400": props.selected,
          "text-blue-100": props.selected,
        },
        props.className
      )}
      onClick={props.onClick}
    >
      <div className="flex flex-row px-2">
        <div className="flex-1">{props.content}</div>
        {props.rightContent}
      </div>
      <div>{props.info}</div>
    </div>
  );
};

interface Props {
  children: React.ReactNode;
  className?: string;
}
export const Menu = ({ children, className }: Props) => {
  return <div className={cx("flex flex-col", className)}>{children}</div>;
};
