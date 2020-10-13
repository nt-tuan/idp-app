import React from "react";
import { Me } from "pages/me/Me";
import { UsersPage } from "./Users";
import { newProtectedRoute, RouteProps } from "components/Core/PrivateRoute";
const UserEditorConsumer = React.lazy(() =>
  import("components/User").then((module) => ({
    default: module.UserEditorConsumer,
  }))
);
const UserViewerConsumer = React.lazy(() =>
  import("components/User").then((module) => ({
    default: module.UserViewerConsumer,
  }))
);
const UserCreatorConsumer = React.lazy(() =>
  import("components/User").then((module) => ({
    default: module.UserCreatorConsumer,
  }))
);
const userRoles = {
  read: "user.read",
  write: "user.write",
};
const CreateUserRoute: RouteProps<void> = newProtectedRoute({
  name: "Tạo",
  path: "/admin/users/create",
  requireRoles: [userRoles.read, userRoles.write],
  getPath: () => "/admin/users/create",
  component: UserCreatorConsumer,
});
const EditUserRoute: RouteProps<string> = newProtectedRoute({
  name: "Cập nhật",
  getPath: (id: string) => `/admin/users/user/${id}/edit`,
  requireRoles: [userRoles.read, userRoles.write],
  path: "/admin/users/user/:id/edit",
  component: UserEditorConsumer,
});
const ViewUserRoute: RouteProps<string> = newProtectedRoute({
  name: "User",
  getPath: (id: string) => `/admin/users/user/${id}`,
  path: "/admin/users/user/:id",
  requireRoles: [userRoles.read, userRoles.write],
  component: UserViewerConsumer,
});
const UsersRoute: RouteProps<void> = newProtectedRoute({
  name: "Tài khoản",
  getPath: () => `/admin/users`,
  path: "/admin/users",
  requireRoles: [userRoles.read],
  component: UsersPage,
});
const MeRoute: RouteProps<void> = newProtectedRoute({
  name: "Thông tin của tôi",
  getPath: () => `/admin/me`,
  path: "/admin/me",
  requireRoles: [],
  component: Me,
});
export const adminRoutes = {
  CreateUserRoute,
  UsersRoute,
  User: {
    Edit: EditUserRoute,
    View: ViewUserRoute,
  },
  MeRoute: MeRoute,
};
