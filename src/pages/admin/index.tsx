import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { NotFound } from "pages/NotFound";
import { UserAdmin } from "./UserAdmin";
import { PageLayout } from "components/layout/PageLayout";
import { UsersRoute } from "routes/admin";
const NotFoundRedirect = () => <Redirect to="/admin/404" />;
export const AdminLayout = () => {
  return (
    <PageLayout>
      <Switch>
        <Route path="/admin/users" exact render={UsersRoute.render} />
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
