import React from "react";
interface Props {
  extras?: React.ReactNode;
  children: React.ReactNode;
}
export const Header = ({ extras, children }: Props) => {
  return (
    <div className="flex flex-row mb-4">
      <div className="flex-1 font-bold text-lg">{children}</div>
      {extras && <div className="flex flex-row">{extras}</div>}
    </div>
  );
};
