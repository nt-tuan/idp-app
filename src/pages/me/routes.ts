import { newProtectedRoute, RouteProps } from "components/Core/PrivateRoute";
import { ChangePassword } from "./ChangePassword";
import { Home } from "./Home";
const ChangePasswordRoute: RouteProps<void> = newProtectedRoute({
  path: "/me/changepassword",
  name: "Đổi mật khẩu",
  getPath: () => "/me/changepassword",
  component: ChangePassword,
});
const HomeRoute: RouteProps<void> = newProtectedRoute({
  path: "/me",
  name: "Hồ sơ",
  getPath: () => "/me",
  component: Home,
});
export const meRoutes = {
  ChangePassword: ChangePasswordRoute,
  Home: HomeRoute,
};
