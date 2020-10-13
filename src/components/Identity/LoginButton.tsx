import React from "react";
import { Button } from "@blueprintjs/core";
import { useReactOidc } from "@axa-fr/react-oidc-context";

export const LoginButton = () => {
  const { login, oidcUser, logout } = useReactOidc();
  const handleLogin = () => {
    if (login == null) console.log("null login function");
    console.log(login);
    login();
  };
  return oidcUser ? (
    <Button onClick={() => logout()}>Logout</Button>
  ) : (
    <Button onClick={handleLogin}>Login</Button>
  );
};
