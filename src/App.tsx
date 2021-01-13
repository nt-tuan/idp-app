import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { PublicLayout } from "pages/Layout";
import { AuthenticationProvider } from "@axa-fr/react-oidc-context";
import { oidcConfiguration } from "resources/configurations";
import { AdminLayout } from "pages/admin";
import { NotAuthenticated } from "pages/NotAuthenticated";
import { NotAuthorized } from "pages/NotAuthorized";
import { Me } from "pages/me";
import { Spinner } from "components/core";

const PageLoading = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <div className="flex flex-col justify-center items-center">
        <img src="/favicon.png" alt="icon" width={30} height={30} />
        <div>Loading</div>
      </div>
    </div>
  );
};
function App() {
  return (
    <div className="text-gray-700 h-full w-full">
      <AuthenticationProvider
        configuration={oidcConfiguration}
        notAuthenticated={NotAuthenticated}
        notAuthorized={NotAuthorized}
        authenticating={Spinner}
        callbackComponentOverride={Spinner}
        sessionLostComponent={Spinner}
      >
        <Suspense fallback={<PageLoading />}>
          <Switch>
            <Route path="/admin" render={() => <AdminLayout />} />
            <Route path="/me" render={() => <Me />} />
            <Route path="/" component={PublicLayout} />
          </Switch>
        </Suspense>
      </AuthenticationProvider>
    </div>
  );
}

export default App;
