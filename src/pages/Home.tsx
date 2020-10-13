import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Button } from "components/Core";
import React from "react";
import { Redirect } from "react-router-dom";
import { meRoutes } from "./me/routes";

export const Home = () => {
  const { oidcUser, login } = useReactOidc();
  if (oidcUser != null) return <Redirect to={meRoutes.Home.path} />;
  return (
    <>
      <div className="flex flex-row items-center justify-center mb-16">
        <img className="inner" src="logo.svg" alt="logo" width="32" />
        <div className="pl-2 text-lg font-extrabold text-blue-500">LOGIN</div>
      </div>
      <div className="flex flex-row justify-center">
        <Button onClick={() => login()}>Login</Button>
      </div>
    </>
  );
};
