import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Button } from "components/Core";
import React from "react";
import { Redirect } from "react-router-dom";
import { routes } from "routes";

export const Home = () => {
  const { oidcUser, login } = useReactOidc();
  if (oidcUser != null) return <Redirect to={routes.MyHomeRoute.path} />;
  return (
    <>
      <div className="flex flex-row justify-center">
        <Button onClick={() => login()}>Login</Button>
      </div>
    </>
  );
};
