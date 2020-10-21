import React from "react";
import { newProtectedRoute } from "components/Core/PrivateRoute";
const userRoles = {
  read: "user.read",
  write: "user.write",
};

export const UserCreateRoute = newProtectedRoute({
  name: "Tạo",
  path: "/admin/users/create",
  requireRoles: [userRoles.read, userRoles.write],
  getPath: () => "/admin/users/create",
  component: React.lazy(() =>
    import("components/User").then((module) => ({
      default: module.UserCreatorConsumer,
    }))
  ),
});

export const UserViewRoute = newProtectedRoute({
  name: "User",
  getPath: (id: string) => `/admin/users/user/${id}`,
  path: "/admin/users/user/:id",
  requireRoles: [userRoles.read, userRoles.write],
  component: React.lazy(() =>
    import("components/User").then((module) => ({
      default: module.UserViewerConsumer,
    }))
  ),
});

export const UsersRoute = newProtectedRoute({
  name: "Quản lý tài khoản",
  getPath: () => `/admin/users`,
  path: "/admin/users",
  requireRoles: [userRoles.read],
  component: React.lazy(() =>
    import("pages/admin/Users").then((module) => ({
      default: module.UsersPage,
    }))
  ),
  children: [UserCreateRoute, UserViewRoute],
});
