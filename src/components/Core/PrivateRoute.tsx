import React, { ComponentType, PropsWithChildren } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { OidcSecure, useReactOidc } from "@axa-fr/react-oidc-context";
import { User } from "oidc-client";

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

export const isAuthorized = (
  requireRoles: string[] | undefined,
  oidcUser: User
) => {
  if (oidcUser == null || oidcUser.profile == null) return false;
  const roles = oidcUser.profile.roles as string[];
  if (requireRoles == null) return true;
  const matchRoles = roles.filter(
    (role) =>
      requireRoles.filter((requiredRole) => requiredRole === role).length > 0
  );
  return matchRoles.length === requireRoles.length;
};

interface Props {
  requireRoles?: string[];
  children: React.ReactNode;
}

export const PrivateRoute = (props: Props) => {
  return (
    <OidcSecure>
      <PrivateRouteController {...props} />
    </OidcSecure>
  );
};

export const PrivateRouteController = ({ requireRoles, children }: Props) => {
  const { oidcUser } = useReactOidc();
  const authorized = React.useMemo(() => isAuthorized(requireRoles, oidcUser), [
    oidcUser,
    requireRoles,
  ]);
  if (oidcUser == null)
    return <Redirect to="/authentication/not-authenticated" />;
  if (!authorized) return <Redirect to="/authentication/not-authorized" />;
  return <>{children}</>;
};

export function newProtectedRoute<T>({
  name,
  path,
  requireRoles,
  getPath,
  component,
}: PageRoute<any>): PageRoute<T> {
  return {
    name,
    path,
    requireRoles,
    getPath,
    component,
    render: protect(component, requireRoles),
  };
}

export const protect = (
  WrappedComponent: ComponentType<any>,
  roles?: string[]
) => (props: PropsWithChildren<any>) => {
  return (
    <PrivateRoute requireRoles={roles}>
      <WrappedComponent {...props} />
    </PrivateRoute>
  );
};
