import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { BrowserRouter, Route, useLocation, Switch } from "react-router-dom";
import { Login, Consent } from "pages/index";
import { Card } from "@blueprintjs/core";
import "styles/App.css";
import { LoginCallback } from "pages/LoginCallback";
import { Home } from "pages/Home";
import { Auth0Provider } from "@auth0/auth0-react";
import { PrivateUser } from "pages/Private";
import { OAuthWrapper } from "components/OAuthProvider";
import { Logout, LogoutSuccess, LogoutFailed } from "pages/Logout";
import { Roles } from "components/Roles";
import { Users } from "pages/Users";
import { AdminLayout } from "layout/admin";
import { PublicLayout } from "layout/public";

function App() {
  return (
    <OAuthWrapper>
      <Switch>
        <Route path="/admin" component={AdminLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
    </OAuthWrapper>
  );
}

export default App;
