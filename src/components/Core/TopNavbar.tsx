import React from "react";
import { Link, matchPath } from "react-router-dom";
import { Menu, MenuItem, Popover, Position } from "@blueprintjs/core";
import { meRoutes } from "pages/me/routes";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { isAuthorized, RouteProps } from "./PrivateRoute";
import { TextButton } from "components/Core";
const NavLinkItem = ({ route }: { route: RouteProps<any> }) => {
  const { oidcUser } = useReactOidc();

  const active = matchPath(window.location.pathname, route.path) != null;
  if (!isAuthorized(route.requireRoles, oidcUser)) return null;
  return (
    <Link to={route.path}>
      <TextButton active={active}>{route.name}</TextButton>
    </Link>
  );
};

interface Props {
  routes?: RouteProps<any>[];
}
export const TopNavbar = ({ routes }: Props) => {
  const { oidcUser, logout } = useReactOidc();
  return (
    <div className="fixed inset-x-0 top-0 flex flex-row items-center h-8 px-2 shadow">
      <div className="flex flex-row items-center self-center">
        <img className="h-full inner" src="/logo.svg" alt="logo" width="32" />
        <div className="pl-1 text-lg font-extrabold text-blue-500">
          MY SHELL
        </div>
        <div className="pr-2 border-r-2 border-blue-500" />
      </div>
      <div className="flex flex-row items-baseline flex-1">
        {routes &&
          routes.map((route) => <NavLinkItem key={route.path} route={route} />)}
      </div>
      {oidcUser && (
        <Popover
          content={
            <Menu>
              <Link to={meRoutes.Home.path}>
                <MenuItem text={meRoutes.Home.name} />
              </Link>
              <Link to={meRoutes.ChangePassword.path}>
                <MenuItem text={meRoutes.ChangePassword.name} />
              </Link>
              <MenuItem text="Đăng xuất" onClick={() => logout()} />
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <TextButton>
            <div className="flex flex-row items-end justify-end w-24 truncate">
              <div>{oidcUser.profile.unique_name}</div>
            </div>
          </TextButton>
        </Popover>
      )}
    </div>
  );
};
