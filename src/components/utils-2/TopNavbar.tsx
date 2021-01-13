import React, { useEffect } from "react";
import {
  Link,
  matchPath,
  Route,
  RouteComponentProps,
  Switch,
  useLocation,
} from "react-router-dom";
import {
  AnchorButton,
  Button,
  Drawer,
  Icon,
  Popover,
  Position,
} from "@blueprintjs/core";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { isAuthorized, PageRoute } from "./PrivateRoute";
import { MenuItem, Menu } from "components/utils";
import { meRoutes } from "routes";
import { BreadcrumbProps, Breadcrumbs, newBreadcrumb } from "./Breadcrumbs";
import Avatar from "react-avatar";
import { LogoIcon } from "components/icon/Icons";
import { UserParams, UsersRoute, UserViewRoute } from "routes/admin";
import { HomeRoute } from "routes/me";
import { IUser } from "resources/models/user";
import { userAPI } from "resources/apis/user";
const NavLinkItem = ({ route }: { route: PageRoute<any> }) => {
  const { oidcUser } = useReactOidc();

  const active = matchPath(window.location.pathname, route.path) != null;
  if (!isAuthorized(route.requireRoles, oidcUser)) return null;
  return (
    <div className="pr-2 last:pr-0">
      <Link to={route.path}>
        <Button active={active}>{route.name}</Button>
      </Link>
    </div>
  );
};

interface Props {
  routes?: PageRoute<any>[];
  breadcrumbs?: BreadcrumbProps[];
}

const UserMenu = () => {
  const { logout } = useReactOidc();
  return (
    <Menu className="text-xl divide-y">
      {meRoutes.map((route) => (
        <Link to={route.path}>
          <MenuItem content={route.name} />
        </Link>
      ))}
      <MenuItem content="Đăng xuất" onClick={() => logout()} />
    </Menu>
  );
};

const UserMenuPopover = () => {
  const { oidcUser, login } = useReactOidc();
  if (oidcUser == null)
    return <Button onClick={() => login()}>Đăng nhập</Button>;
  return (
    <Popover content={<UserMenu />} position={Position.BOTTOM}>
      <AnchorButton>
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
      </AnchorButton>
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
          <div className="flex flex-row items-baseline text-blue-500">
            <LogoIcon className="w-6 h-6" />
            <div className="pl-1 text-lg font-extrabold">MY-SHELL</div>
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
        <hr />
        <UserMenu />
      </Drawer>
    </>
  );
};

const LargeTopBar = ({ routes, breadcrumbs }: Props) => {
  return (
    <div className="fixed inset-x-0 top-0 flex-row items-baseline hidden py-1 px-2 shadow sm:flex">
      <div className="flex flex-row items-baseline">
        <LogoIcon className="w-6 h-6 text-blue-500" />
        <div className="pl-1 text-lg font-extrabold text-blue-500">
          MY SHELL
        </div>
        <div className="pr-2 border-r-2 border-blue-500" />
      </div>
      <div className="flex flex-row items-baseline flex-1">
        {routes &&
          routes.map((route) => <NavLinkItem key={route.path} route={route} />)}
      </div>
      <UserMenuPopover />
    </div>
  );
};

const SmallTopBar = ({ routes, breadcrumbs }: Props) => {
  return (
    <div className="fixed inset-x-0 top-0 flex flex-row items-center h-10 px-2 shadow sm:hidden">
      <div className="flex-1">
        {breadcrumbs && (
          <Breadcrumbs
            breadcrumbs={[
              {
                href: "/",
                text: <LogoIcon className="w-8 h-8 text-blue-500" />,
              },
              ...breadcrumbs,
            ]}
          />
        )}
      </div>
      <CollapseMenu routes={[...(routes ?? [])]} />
    </div>
  );
};

const UserPage = ({ match }: RouteComponentProps<UserParams>) => {
  const [user, setUser] = React.useState<IUser>();
  const { oidcUser } = useReactOidc();
  useEffect(() => {
    userAPI.get(oidcUser, match.params.id).then(setUser);
  }, [match, oidcUser]);
  const breadcrumbs = React.useMemo(() => {
    const bs = [
      newBreadcrumb(UsersRoute),
      ...(user
        ? [
            {
              text: user.username,
              href: UserViewRoute.getPath(user.id),
              active: true,
            },
          ]
        : []),
    ];
    return bs;
  }, [user]);
  return (
    <>
      <LargeTopBar routes={[UsersRoute]} breadcrumbs={breadcrumbs} />
      <SmallTopBar routes={[UsersRoute]} breadcrumbs={breadcrumbs} />
    </>
  );
};

const DefaultPage = () => {
  const location = useLocation();
  const breadcrumbs = React.useMemo(() => {
    const bs: BreadcrumbProps[] = [];
    const routes = [...meRoutes, UsersRoute];
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const match = matchPath(location.pathname, route.path);
      if (match) {
        bs.push(newBreadcrumb(route, match.isExact));
        break;
      }
    }
    return bs;
  }, [location]);
  return (
    <>
      <LargeTopBar routes={[UsersRoute]} breadcrumbs={breadcrumbs} />
      <SmallTopBar routes={[UsersRoute]} breadcrumbs={breadcrumbs} />
    </>
  );
};
export const TopNavbar = () => {
  return (
    <>
      <Switch>
        <Route path={UserViewRoute.path} component={UserPage} />
        <Route path={UsersRoute.path} component={DefaultPage} />
        <Route path={HomeRoute.path} component={DefaultPage} />
      </Switch>
    </>
  );
};
