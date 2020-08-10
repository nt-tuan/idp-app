import React from "react";
import { Card } from "@blueprintjs/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, Consent } from "pages";
import { LogoutSuccess, Logout, LogoutFailed } from "pages/Logout";
import { LoginCallback } from "pages/LoginCallback";
import { PrivateUser } from "pages/Private";
import { Users } from "pages/Users";
import { Home } from "pages/Home";

export const PublicLayout = () => {
  return (
    <Card className="App">
      <div className="card-header">
        <img className="inner" src="/logo-gt.png" alt="logo" width="50" />
        <h2 className="inner bp3-heading" style={{ marginLeft: "3px" }}>
          CHỨNG THỰC NGƯỜI DÙNG
        </h2>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/consent" exact component={Consent} />
          <Route path="/logout/callback" exact component={LogoutSuccess} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/logout/failed" exact component={LogoutFailed} />
          <Route path="/callback" exact component={LoginCallback} />
          <Route path="/private" exact component={PrivateUser} />
          <Route path="/" exact component={Home} />
        </Switch>
      </div>
    </Card>
  );
};
