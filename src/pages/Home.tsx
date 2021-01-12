import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Button } from "@blueprintjs/core";
import React from "react";
import { Redirect } from "react-router-dom";
import { HomeRoute } from "routes/me";

export const Home = () => {
  const { oidcUser, login } = useReactOidc();
  if (oidcUser != null) return <Redirect to={HomeRoute.path} />;
  return (
    <>
      <div className="flex flex-row justify-center">
        <Button onClick={() => login()}>Login</Button>
      </div>
    </>
  );
};
