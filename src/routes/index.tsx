import { RouteComponentProps } from "react-router-dom";
import { UsersRoute, UserViewRoute, UserCreateRoute } from "./admin";
import { HomeRoute as MyHomeRoute, ChangePasswordRoute } from "./me";
export type PageRoute<T> = {
  name: string;
  path: string;
  requireRoles?: string[];
  children?: PageRoute<any>[];
  getPath: (parameters: T) => string;
  render?: (props: RouteComponentProps<any>) => JSX.Element;
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
};

export type PageRouteSet = {
  [name: string]: PageRoute<any>;
};

export const routes = {
  UsersRoute,
  UserViewRoute,
  UserCreateRoute,
  MyHomeRoute,
  ChangePasswordRoute,
};
