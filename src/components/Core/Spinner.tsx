import React from "react";

export const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src="/favicon.png" alt="icon" width={30} height={30} />
      <div className="flex flex-row">
        <svg className="w-5 h-5 text-blue-500 animate-spin" viewBox="0 0 50 50">
          <circle
            className="stroke-current"
            style={{ animation: "dash 1.5s ease-in-out infinite" }}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          ></circle>
        </svg>
        <div className="pl-2 text-gray-500">Chờ chút nhe ^^</div>
      </div>
    </div>
  );
};
