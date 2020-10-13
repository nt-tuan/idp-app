import React from "react";
import cx from "classnames";

export const Layout2 = ({
  left,
  main,
  right,
}: {
  left?: React.ReactNode;
  main: React.ReactNode;
  right?: React.ReactNode;
}) => {
  return (
    <div className="flex flex-row h-full w-full">
      {left && (
        <div className="w-64 pr-2">
          <div className="px-4 rounded h-full">{left}</div>
        </div>
      )}
      <div
        className={cx("flex-1", {
          "pl-2": left,
          "border-l-2 border-gray-300": left,
        })}
      >
        <div className="px-4 rounded h-full">{main}</div>
      </div>
      {right && <div className="w-64 px-2">{right}</div>}
    </div>
  );
};
