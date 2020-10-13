import { TopNavbar } from "components/Core";
import { RouteProps } from "components/Core/PrivateRoute";
import React from "react";

interface Props {
  children: React.ReactNode;
  routes?: RouteProps<any>[];
}
export const HeaderPageLayout = ({ children, routes }: Props) => {
  return (
    <div className="h-screen flex">
      <TopNavbar routes={routes} />
      <div className="flex-1 px-2 pt-12 h-full">
        <div className="h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
