import React from "react";

export const Spinner = () => {
  return (
    <svg className="w-5 h-5 animate-spin" viewBox="0 0 50 50">
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
  );
};
