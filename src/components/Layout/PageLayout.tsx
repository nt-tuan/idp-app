import { TopNavbar } from "components/Core";
import { BreadscrumbProps } from "components/Core/Breadscrumbs";
import { PageRoute } from "components/Core/PrivateRoute";
import React from "react";

interface Props {
  children: React.ReactNode;
  routes?: PageRoute<any>[];
}
interface LayoutState {
  addRoutes: (routes: PageRoute<any>[]) => void;
  setBreadscrumbs: (routes: BreadscrumbProps[]) => void;
}
export const LayoutContext = React.createContext<LayoutState>({
  addRoutes: () => {},
  setBreadscrumbs: () => {},
});

export const PageLayout = ({ children, routes }: Props) => {
  const [injectedRoutes, addRoutes] = React.useState<PageRoute<any>[]>([]);
  const [breadscrumbs, setBreadscrumbs] = React.useState<BreadscrumbProps[]>();
  return (
    <LayoutContext.Provider value={{ addRoutes, setBreadscrumbs }}>
      <div className="h-screen flex">
        <TopNavbar
          routes={[...(routes ?? []), ...injectedRoutes]}
          breadscrumbs={breadscrumbs}
        />
        <div className="flex-1 px-2 pt-12 h-full">
          <div className="h-full overflow-y-auto">{children}</div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
};
