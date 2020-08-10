import React, { useEffect, useState, useCallback } from "react";
import { Spinner } from "@blueprintjs/core";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { idp } from "resources";
export const Logout = () => {
  const location = useLocation();
  useEffect(() => {
    var query = queryString.parse(location.search);
    const { logout_challenge } = query;
    idp
      .logout(logout_challenge as string)
      .then((json) => (window.location.href = json.redirect_to))
      .catch(() => (window.location.href = "/logout/failed"));
  }, []);
  return <Spinner />;
};

export const LogoutFailed = () => {
  return <div>Đã xãy ra lỗi trong quá trình đăng xuất</div>;
};

export const LogoutSuccess = () => {
  const [countdown, setCountdown] = useState<number>(5);

  const setTimer = useCallback(
    (redirect_uri: string) => {
      setTimeout(() => {
        if (countdown <= 1) {
          window.location.href = redirect_uri;
          return;
        }
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    },
    [countdown]
  );

  useEffect(() => {
    var redirect_uri = "/";
    setTimer(redirect_uri);
  }, [setTimer]);

  return <div>Bạn đã đăng xuất thành công, chuyển hướng trong {countdown}</div>;
};
