import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotFound } from "pages/NotFound";
import { UserAdmin } from "./UserAdmin";
import { PageLayout } from "components/Layout/PageLayout";
import { routes } from "routes";
const NotFoundRedirect = () => <Redirect to="/admin/404" />;
export const AdminLayout = () => {
  return (
    <PageLayout routes={[routes.UsersRoute]}>
      <Switch>
        <Route path="/admin/users" exact render={routes.UsersRoute.render} />
        <Route
          path={["/admin/users/user/:id", "/admin/users/create"]}
          render={(props) => <UserAdmin {...props} />}
        />
        <Route path="/admin/404" component={NotFound} />
        <Route component={NotFoundRedirect} />
      </Switch>
    </PageLayout>
  );
};
