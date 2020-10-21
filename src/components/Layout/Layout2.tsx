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
  React.useEffect(() => {
    console.log("layout mounted");
    return () => console.log("layout unmounted");
  }, []);
  return (
    <div className="flex flex-col w-full h-full sm:flex-row">
      {left && (
        <div className="w-full sm:w-64">
          <div className="h-full px-4">{left}</div>
        </div>
      )}
      <div
        className={cx("flex-1", {
          "sm:border-l sm:border-gray-300": left,
        })}
      >
        <div className="h-full px-4">{main}</div>
      </div>
      {right && <div className="w-64 px-2">{right}</div>}
    </div>
  );
};
