import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Users } from "pages/Users";
import { PrivateUser } from "pages/Private";

export const AdminLayout = () => {
  return (
    <div>
      <Switch>
        <Route path="/admin/private" exact component={PrivateUser} />
        <Route path="/admin/users" exact component={Users} />
      </Switch>
    </div>
  );
};
