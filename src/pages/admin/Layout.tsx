import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotFound } from "pages/NotFound";
import { adminRoutes } from "./routes";
import { UserAdmin } from "./UserAdmin";
import { meRoutes } from "pages/me/routes";
import { HeaderPageLayout } from "components/Layout/HeaderPageLayout";
const NotFoundRedirect = () => <Redirect to="/admin/404" />;
export const AdminLayout = () => {
  React.useEffect(() => {
    console.log("mount admin wrapper");
    return () => {
      console.log("unmount admin wrapper");
    };
  }, []);
  return (
    <HeaderPageLayout routes={[meRoutes.Home, adminRoutes.UsersRoute]}>
      <Switch>
        <Route
          path="/admin/users"
          exact
          component={adminRoutes.UsersRoute.render}
        />
        <Route
          path={["/admin/users/user/:id", "/admin/users/create"]}
          render={(props) => <UserAdmin {...props} />}
        />
        <Route path="/admin/404" component={NotFound} />
        <Route component={NotFoundRedirect} />
      </Switch>
    </HeaderPageLayout>
  );
};
