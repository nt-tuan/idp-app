import { PageRoute } from "components/core/PrivateRoute";
import { UserViewRoute, UserCreateRoute } from "./admin";
import { HomeRoute, ChangePasswordRoute } from "./me";

export type PageRouteSet = {
  [name: string]: PageRoute<any>;
};
export const meRoutes = [HomeRoute, ChangePasswordRoute];
export const adminRoutes = [UserViewRoute, UserCreateRoute];
