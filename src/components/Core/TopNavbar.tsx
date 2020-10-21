import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Drawer, Icon, Popover, Position } from "@blueprintjs/core";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { isAuthorized, PageRoute } from "./PrivateRoute";
import { MenuItem, Menu, TextButton } from "components/Core";
import { routes as globalRoutes } from "routes";
import { BreadscrumbProps, Breadscrumbs } from "./Breadscrumbs";
import Avatar from "react-avatar";
const NavLinkItem = ({ route }: { route: PageRoute<any> }) => {
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
  routes?: PageRoute<any>[];
  breadscrumbs?: BreadscrumbProps[];
}
export const TopNavbar = ({ routes, breadscrumbs }: Props) => {
  const { oidcUser, logout } = useReactOidc();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div className="fixed inset-x-0 top-0 flex flex-row items-center h-10 px-2 shadow">
      <div className="flex flex-row items-center self-center">
        <Icon
          iconSize={32}
          className="pr-2 sm:hidden block text-blue-500 cursor-pointer"
          onClick={() => setMenuOpen(true)}
          icon="menu"
        />
        <Drawer
          icon="menu"
          onClose={() => setMenuOpen(false)}
          title="Menu"
          isOpen={menuOpen}
          position={Position.LEFT}
        >
          <Menu className="text-xl divide-y">
            {routes &&
              routes.map((route) => (
                <Link to={route.path} key={route.path}>
                  <MenuItem
                    content={route.name}
                    selected={matchPath(location.pathname, route.path)?.isExact}
                  />
                </Link>
              ))}
          </Menu>
        </Drawer>
        <img className="h-full inner" src="/logo.svg" alt="logo" width="32" />
        <div className="pl-1 text-lg font-extrabold text-blue-500 hidden sm:block">
          MY SHELL
        </div>
        <div className="pr-2 border-r-2 border-blue-500" />
      </div>
      <div className="sm:hidden flex flex-1">
        {breadscrumbs && <Breadscrumbs breadscrumbs={breadscrumbs} />}
      </div>
      <div className="sm:flex sm:flex-row sm:items-baseline sm:flex-1 hidden">
        {routes &&
          routes.map((route) => <NavLinkItem key={route.path} route={route} />)}
      </div>
      {oidcUser && (
        <Popover
          content={
            <Menu>
              <Link to={globalRoutes.MyHomeRoute.path}>
                <MenuItem content={globalRoutes.MyHomeRoute.name} />
              </Link>
              <Link to={globalRoutes.ChangePasswordRoute.path}>
                <MenuItem content={globalRoutes.ChangePasswordRoute.name} />
              </Link>
              <MenuItem content="Đăng xuất" onClick={() => logout()} />
            </Menu>
          }
          position={Position.BOTTOM}
        >
          <TextButton>
            <div className="flex flex-row items-end justify-end w-24 truncate">
              <Avatar
                size="18px"
                round
                name={oidcUser.profile.unique_name}
                src={oidcUser.profile.picture}
              />
              <div className="pl-1 hidden sm:block">
                {oidcUser.profile.unique_name}
              </div>
              <Icon icon="chevron-down" />
            </div>
          </TextButton>
        </Popover>
      )}
    </div>
  );
};
