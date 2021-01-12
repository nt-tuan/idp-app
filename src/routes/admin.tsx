import React from "react";
import { newProtectedRoute } from "components/core/PrivateRoute";
export const allUserRoles = {
  read: "user.read",
  write: "user.write",
};

export const UserCreateRoute = newProtectedRoute({
  name: "Tạo",
  path: "/admin/users/create",
  requireRoles: [allUserRoles.read, allUserRoles.write],
  getPath: () => "/admin/users/create",
  component: React.lazy(() =>
    import("components/user").then((module) => ({
      default: module.UserCreatorConsumer,
    }))
  ),
});

export interface UserParams {
  id: string;
}

export const UserViewRoute = newProtectedRoute({
  name: "User",
  getPath: (id: string) => `/admin/users/user/${id}`,
  path: "/admin/users/user/:id",
  requireRoles: [allUserRoles.read],
  component: React.lazy(() =>
    import("pages/admin/UserDetail").then((module) => ({
      default: module.UserViewerConsumer,
    }))
  ),
});

export const UsersRoute = newProtectedRoute({
  name: "Quản lý tài khoản",
  getPath: () => `/admin/users`,
  path: "/admin/users",
  requireRoles: [allUserRoles.read],
  component: React.lazy(() =>
    import("pages/admin/Users").then((module) => ({
      default: module.UsersPage,
    }))
  ),
  children: [UserCreateRoute, UserViewRoute],
});
