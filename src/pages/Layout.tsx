import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login, Consent } from "pages";
import { Logout, LogoutFailed } from "pages/Logout";
import { Home } from "pages/Home";
import { LogoutCallback } from "./LogoutCallback";
const RedirectHome = () => <Redirect to="/" />;
export const PublicLayout = () => {
  return (
    <div className="flex flex-col justify-center h-screen">
      <div style={{ height: "400px", width: "350px", margin: "auto" }}>
        <div className="flex flex-col items-center w-full h-full">
          <div className="flex-1 w-full px-2">
            <div className="flex flex-col justify-center h-full font-bold text-gray-700">
              <Switch>
                <Route path="/login" exact component={Login} />
                <Route path="/consent" exact component={Consent} />

                <Route path="/logout" exact component={Logout} />
                <Route path="/logout/failed" exact component={LogoutFailed} />
                <Route
                  path="/logout/callback"
                  exact
                  component={LogoutCallback}
                />
                <Route path="/" exact component={Home} />
                <Route component={RedirectHome} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
