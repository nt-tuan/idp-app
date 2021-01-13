import React from "react";
import cx from "classnames";
interface Props {
  children?: React.ReactNode[];
  type?: "vertical" | "horizontal";
  spacing?: number;
  className?: string;
}
export const Stack = (props: Props) => {
  const prefix = props.type === "vertical" ? "pb-" : "pr-";
  const spaceClass = prefix + (props.spacing ?? 2);
  const directionClass =
    props.type === "vertical" ? "flex flex-col" : "flex flex-row";
  const elements = props.children?.filter((e) => e != null);
  if (elements == null) return <></>;
  return (
    <div className={cx(directionClass, props.className)}>
      {elements.map((element, index) => (
        <div key={index} className={cx(spaceClass, "last:pr-0 last:pb-0")}>
          {element}
        </div>
      ))}
    </div>
  );
};
