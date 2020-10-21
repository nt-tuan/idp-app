import { Menu, MenuItem } from "components/Core";
import { PageLayout } from "components/Layout/PageLayout";
import { Layout2 } from "components/Layout/Layout2";
import React from "react";
import { Link, matchPath, Route, Switch, useLocation } from "react-router-dom";
import { routes } from "routes";
export const Me = () => {
  const location = useLocation();
  return (
    <div className="text-gray-700">
      <PageLayout routes={[routes.UsersRoute]}>
        <Layout2
          left={
            <Menu className="hidden sm:flex">
              <MenuItem
                className="flex-1 text-center sm:flex-0 sm:text-left"
                selected={
                  matchPath(location.pathname, routes.MyHomeRoute.path)?.isExact
                }
                content={
                  <Link to={routes.MyHomeRoute.getPath(undefined)}>
                    {routes.MyHomeRoute.name}
                  </Link>
                }
              />
              <MenuItem
                className="flex-1 text-center sm:flex-0 sm:text-left"
                selected={
                  matchPath(location.pathname, routes.ChangePasswordRoute.path)
                    ?.isExact
                }
                content={
                  <Link to={routes.ChangePasswordRoute.getPath(undefined)}>
                    {routes.ChangePasswordRoute.name}
                  </Link>
                }
              />
            </Menu>
          }
          main={
            <Switch>
              <Route
                exact
                path={routes.ChangePasswordRoute.path}
                render={routes.ChangePasswordRoute.render}
              />
              <Route
                path={routes.MyHomeRoute.path}
                render={routes.MyHomeRoute.render}
              />
            </Switch>
          }
        />
      </PageLayout>
    </div>
  );
};
