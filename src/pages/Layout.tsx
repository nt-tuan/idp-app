import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login, Consent } from "pages";
import { Logout, LogoutFailed } from "pages/Logout";
import { Home } from "pages/Home";
import { LogoutCallback } from "./LogoutCallback";
const RedirectHome = () => <Redirect to="/" />;
export const PublicLayout = () => {
  return (
    <div className="flex flex-col justify-center h-screen pattern">
      <div
        className="bg-gray-100 rounded-lg shadow"
        style={{ height: "500px", width: "312px", margin: "auto" }}
      >
        <div className="flex flex-col items-center w-full h-full px-4">
          <div className="flex flex-row items-center justify-center py-2">
            <img className="inner" src="logo.svg" alt="logo" width="48" />
            <div className="pl-2 text-4xl font-extrabold text-blue-500">
              MY SHELL
            </div>
          </div>
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
