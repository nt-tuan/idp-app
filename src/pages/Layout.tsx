import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Login, Consent } from "pages";
import { Logout, LogoutFailed } from "pages/Logout";
import { Home } from "pages/Home";
import { LogoutCallback } from "./LogoutCallback";
import { LogoIcon } from "components/icon/Icons";
import { NotAuthorized } from "./NotAuthorized";
const RedirectHome = () => <Redirect to="/" />;
export const PublicLayout = () => {
  return (
    <div className="flex flex-col justify-center h-full w-full pattern">
      <div className="bg-gray-100 rounded-lg shadow h-full w-full md:w-96 md:h-128 md:mx-auto overflow-hidden text-center">
        <div className="flex flex-col items-baseline w-full h-full px-4">
          <div className="flex flex-row items-baseline justify-center py-2 w-full">
            <LogoIcon className="w-12 h-12 text-blue-500" />
            <div className="pl-8 text-4xl font-extrabold text-blue-500">
              MY-SHELL
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
                <Route path="/401" component={NotAuthorized} />
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
