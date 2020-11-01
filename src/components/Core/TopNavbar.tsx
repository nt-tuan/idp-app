import React from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Drawer, Icon, Popover, Position } from "@blueprintjs/core";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { isAuthorized, PageRoute } from "./PrivateRoute";
import { MenuItem, Menu, TextButton } from "components/Core";
import { routes as globalRoutes } from "routes";
import { BreadscrumbProps, Breadscrumbs } from "./Breadscrumbs";
import Avatar from "react-avatar";
import { LogoIcon } from "components/Icon/Icons";
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

const UserMenu = () => {
  const { oidcUser, logout } = useReactOidc();
  if (oidcUser == null) return <TextButton>Đăng nhập</TextButton>;
  return (
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
        <div className="flex flex-row justify-end">
          <Avatar
            size="18px"
            textSizeRatio={1.7}
            round
            name={oidcUser.profile.unique_name}
            src={oidcUser.profile.picture}
          />
          <div className="pl-1">{oidcUser.profile.unique_name}</div>
          <Icon icon="chevron-down" />
        </div>
      </TextButton>
    </Popover>
  );
};

const CollapseMenu = ({ routes }: { routes: PageRoute<any>[] }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const location = useLocation();
  return (
    <>
      <Icon
        iconSize={32}
        className="px-4 text-blue-500 cursor-pointer"
        onClick={() => setMenuOpen(true)}
        icon="menu"
      />
      <Drawer
        onClose={() => setMenuOpen(false)}
        title={
          <div className="flex flex-row items-center self-center">
            <img
              className="h-full inner"
              src="/logo.svg"
              alt="logo"
              width="32"
            />
            <div className="pl-1 text-lg font-extrabold text-blue-500">
              MY SHELL
            </div>
          </div>
        }
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
    </>
  );
};

const LargeTopbar = ({ routes, breadscrumbs }: Props) => {
  return (
    <div className="fixed inset-x-0 top-0 flex-row items-baseline hidden py-1 px-2 shadow sm:flex">
      <div className="flex flex-row items-baseline">
        <LogoIcon className="w-6 h-5 text-blue-500" />
        <div className="pl-1 text-lg font-extrabold text-blue-500">
          MY SHELL
        </div>
        <div className="pr-2 border-r-2 border-blue-500" />
      </div>
      <div className="flex flex-row items-baseline flex-1">
        {routes &&
          routes.map((route) => <NavLinkItem key={route.path} route={route} />)}
      </div>
      <UserMenu />
    </div>
  );
};

const SmallTopbar = ({ routes, breadscrumbs }: Props) => {
  return (
    <div className="fixed inset-x-0 top-0 flex flex-row items-center h-10 px-2 shadow sm:hidden">
      <div className="flex-1">
        {breadscrumbs && (
          <Breadscrumbs
            breadscrumbs={[
              {
                href: "/",
                text: <LogoIcon className="w-8 h-8 text-blue-500" />,
              },
              ...breadscrumbs,
            ]}
          />
        )}
      </div>
      <CollapseMenu
        routes={[
          ...(routes ?? []),
          globalRoutes.MyHomeRoute,
          globalRoutes.ChangePasswordRoute,
        ]}
      />
    </div>
  );
};
export const TopNavbar = (props: Props) => {
  return (
    <>
      <LargeTopbar {...props} />
      <SmallTopbar {...props} />
    </>
  );
};
