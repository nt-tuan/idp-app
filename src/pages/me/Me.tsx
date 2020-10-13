import { Menu, MenuItem } from "components/Core";
import { HeaderPageLayout } from "components/Layout/HeaderPageLayout";
import { Layout2 } from "components/Layout/Layout2";
import { adminRoutes } from "pages/admin/routes";
import React from "react";
import { Link, matchPath, Route, Switch, useLocation } from "react-router-dom";
import { meRoutes } from "./routes";
export const Me = () => {
  const location = useLocation();
  return (
    <div className="text-gray-700">
      <HeaderPageLayout routes={[meRoutes.Home, adminRoutes.UsersRoute]}>
        <Layout2
          left={
            <Menu className="flex-row sm:flex-col">
              <MenuItem
                className="flex-1 text-center sm:flex-0 sm:text-left"
                selected={
                  matchPath(location.pathname, meRoutes.Home.path)?.isExact
                }
                content={
                  <Link to={meRoutes.Home.getPath()}>{meRoutes.Home.name}</Link>
                }
              />
              <MenuItem
                className="flex-1 text-center sm:flex-0 sm:text-left"
                selected={
                  matchPath(location.pathname, meRoutes.ChangePassword.path)
                    ?.isExact
                }
                content={
                  <Link to={meRoutes.ChangePassword.getPath()}>
                    {meRoutes.ChangePassword.name}
                  </Link>
                }
              />
            </Menu>
          }
          main={
            <Switch>
              <Route
                exact
                path={meRoutes.ChangePassword.path}
                render={meRoutes.ChangePassword.render}
              />
              <Route path={meRoutes.Home.path} render={meRoutes.Home.render} />
            </Switch>
          }
        />
      </HeaderPageLayout>
    </div>
  );
};
