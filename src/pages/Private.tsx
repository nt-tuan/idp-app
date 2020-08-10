import React, { useContext, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { PrivateRoute } from "components/PrivateRoute";
import { OAuthContext } from "components/OAuthProvider";
import { LogoutButton } from "components/LogoutButton";
import ClientOAuth2 from "client-oauth2";
import { auth } from "resources/auth";
import { useCookies } from "react-cookie";

export const PrivateUser = () => {
  const { user } = useContext(OAuthContext);
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "id_token",
  ]);
  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api/Admin/authenticated`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.id_token}`,
    };
    fetch(url, { headers });
  }, [user]);
  return (
    <PrivateRoute>
      <div>{user}</div>
      <LogoutButton redirect={true} />
    </PrivateRoute>
  );
};
