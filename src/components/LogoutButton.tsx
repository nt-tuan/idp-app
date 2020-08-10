import React, { useCallback } from "react";
import { useCookies } from "react-cookie";
import { Button } from "@blueprintjs/core";
import queryString from "query-string";

export const LogoutButton = ({ redirect }: { redirect: boolean }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["id_token"]);
  const handleLogout = useCallback(() => {
    const token = cookies.id_token;
    removeCookie("id_token");
    removeCookie("access_token");
    removeCookie("refresh_token");
    removeCookie("user");
    const url = `${process.env.REACT_APP_AUTH_URL}/oauth2/sessions/logout`;
    var query = {};
    if (redirect)
      query = {
        id_token_hint: token,
        post_logout_redirect_uri: `${process.env.REACT_APP_URL}/logout/callback`,
      };
    window.location.href = queryString.stringifyUrl({ url, query });
  }, [cookies]);
  return <Button onClick={handleLogout}>Đăng xuất</Button>;
};
