import React from "react";
import cx from "classnames";
interface Props {
  onChange?: (name: string, value: string) => void;
  className?: string;
  value?: string;
  placeholder?: string;
  type?: string;
  label?: React.ReactNode;
  name?: string;
}
export const Input = (props: Props) => (
  <div className="flex flex-row items-center">
    {props.label}
    <input
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      className={cx(
        "w-full text-xl font-bold border-b-2 outline-none placeholder-gray-300",
        props.className
      )}
      onChange={(e) =>
        props.onChange && props.onChange(e.target.name, e.target.value)
      }
      type={props.type}
    />
  </div>
);
