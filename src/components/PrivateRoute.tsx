import React, { useContext, useEffect } from "react";
import { OAuthContext } from "./OAuthProvider";
import { LoginButton } from "./LoginButton";
import { auth } from "resources";
import ClientOAuth2 from "client-oauth2";

export const PrivateRoute = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { token } = useContext(OAuthContext);
  const isAuthenticated = () => {
    if (token === undefined) return false;
    return !token.expired();
  };
  if (!isAuthenticated()) {
    return (
      <div>
        Bạn không đủ quyền truy cập vào trang này
        <LoginButton />
      </div>
    );
  }
  return <>{children}</>;
};
