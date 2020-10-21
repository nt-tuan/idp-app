import { newProtectedRoute } from "components/Core/PrivateRoute";
import React from "react";
const Home = React.lazy(() =>
  import("pages/me/Home").then((module) => ({ default: module.Home }))
);
const ChangePassword = React.lazy(() =>
  import("pages/me/ChangePassword").then((module) => ({
    default: module.ChangePassword,
  }))
);
export const ChangePasswordRoute = newProtectedRoute({
  path: "/me/changepassword",
  name: "Đổi mật khẩu",
  getPath: () => "/me/changepassword",
  component: ChangePassword,
});
export const HomeRoute = newProtectedRoute({
  path: "/me",
  name: "Hồ sơ",
  getPath: () => "/me",
  component: Home,
  children: [ChangePasswordRoute],
});
