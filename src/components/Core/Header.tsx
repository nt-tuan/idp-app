import React from "react";
interface Props {
  extras?: React.ReactNode;
  children: React.ReactNode;
}
export const Header = ({ extras, children }: Props) => {
  return (
    <div className="flex flex-row mb-2">
      <div className="flex-1 text-lg font-bold">{children}</div>
      {extras && <div className="flex flex-row">{extras}</div>}
    </div>
  );
};
