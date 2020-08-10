import React, { useState, useEffect } from "react";
import { Button, InputGroup, Spinner } from "@blueprintjs/core";
import { useLocation, useHistory } from "react-router-dom";
import { auth } from "resources/auth";
import { useCookies } from "react-cookie";

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
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
        setCookie("id_token", res.data.id_token);

        const { url, method, headers } = res.sign({
          method: "GET",
          url: `${process.env.REACT_APP_AUTH_URL}/userinfo`,
          headers: { "Content-Type": "application/json" },
        });
        return fetch(url, { headers, method });
      })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(res.statusText);
      })
      .then((userinfo) => {
        setCookie("user", userinfo.sub);
        setCookie("roles", userinfo.roles);
        history.push("/private");
      });
  }, []);
  return <Spinner />;
};
