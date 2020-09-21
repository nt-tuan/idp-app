import React, { useState, useEffect } from "react";
import { Button, InputGroup, Spinner } from "@blueprintjs/core";
import { useLocation, useHistory } from "react-router-dom";
import { auth } from "resources/auth";
import { useCookies } from "react-cookie";
import { constants } from "resources/constants";
import { StoredToken } from "resources/authToken";

export const LoginCallback = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState<string>();
  const history = useHistory();
  useEffect(() => {
    const verifier = sessionStorage.getItem("verifier") ?? "";
    const nouce = sessionStorage.getItem("nouce") ?? "";
    auth.code
      .getToken(window.location.href, {
        state: nouce,
        body: {
          code_verifier: verifier,
        },
      })
      .then(async (token) => {
        const { accessToken, refreshToken, data } = token;
        const storedToken: StoredToken = {
          accessToken,
          refreshToken,
          data,
        };
        setCookie(constants.AUTH_TOKEN_KEY, JSON.stringify(storedToken));
        token.expiresIn(parseInt(token.data.expires_in));
        history.push("/private");
      });
  }, []);
  return <Spinner />;
};
