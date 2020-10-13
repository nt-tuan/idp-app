import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { PublicLayout } from "pages/Layout";
import { AuthenticationProvider } from "@axa-fr/react-oidc-context";
import { oidcConfiguration } from "resources/configurations";
import { AdminLayout } from "pages/admin/Layout";
import { NotAuthenticated } from "pages/NotAuthenticated";
import { NotAuthorized } from "pages/NotAuthorized";
import { Me } from "pages/me/Me";
import { Spinner } from "components/Core";

function App() {
  return (
    <AuthenticationProvider
      configuration={oidcConfiguration}
      notAuthenticated={NotAuthenticated}
      notAuthorized={NotAuthorized}
      authenticating={Spinner}
      callbackComponentOverride={Spinner}
      sessionLostComponent={Spinner}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/admin" render={() => <AdminLayout />} />
          <Route path="/me" render={() => <Me />} />
          <Route path="/" component={PublicLayout} />
        </Switch>
      </Suspense>
    </AuthenticationProvider>
  );
}

export default App;
