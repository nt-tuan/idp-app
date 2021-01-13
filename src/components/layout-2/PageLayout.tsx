import { TopNavbar } from "components/utils";
import React from "react";

interface Props {
  children: React.ReactNode;
}
export const PageLayout = ({ children }: Props) => {
  return (
    <div className="h-screen flex">
      <TopNavbar />
      <div className="flex-1 px-2 pt-12 h-full w-full">
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
