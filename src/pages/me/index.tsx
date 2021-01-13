import { Menu, MenuItem } from "components/utils";
import { PageLayout } from "components/layout/PageLayout";
import { Layout2 } from "components/layout/Layout2";
import React from "react";
import { Link, matchPath, Route, Switch, useLocation } from "react-router-dom";
import { meRoutes } from "routes";
export const Me = () => {
  const location = useLocation();
  return (
    <div className="text-gray-700">
      <PageLayout>
        <Layout2
          left={
            <Menu className="hidden sm:flex">
              {meRoutes.map((route) => (
                <MenuItem
                  className="flex-1 text-center sm:flex-0 sm:text-left"
                  selected={matchPath(location.pathname, route.path)?.isExact}
                  content={
                    <Link to={route.getPath(undefined)}>{route.name}</Link>
                  }
                />
              ))}
            </Menu>
          }
          main={
            <Switch>
              {meRoutes.map((route) => (
                <Route
                  exact={route.exact}
                  path={route.path}
                  render={route.render}
                />
              ))}
            </Switch>
          }
        />
      </PageLayout>
    </div>
  );
};
