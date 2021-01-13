import React from "react";
import { Button } from "@blueprintjs/core";
import { useReactOidc } from "@axa-fr/react-oidc-context";

export const LoginButton = () => {
  const { login, oidcUser, logout } = useReactOidc();
  const handleLogin = () => {
    login();
  };
  return oidcUser ? (
    <Button onClick={() => logout()}>Logout</Button>
  ) : (
    <Button onClick={handleLogin}>Login</Button>
  );
};
