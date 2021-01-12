import React, { useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { idp } from "resources";
import { Spinner } from "components/core";
export const Logout = () => {
  const location = useLocation();
  useEffect(() => {
    var query = queryString.parse(location.search);
    const { logout_challenge } = query;
    idp
      .logout(logout_challenge as string)
      .then((json) => (window.location.href = json.redirect_to))
      .catch(() => (window.location.href = "/logout/failed"));
  }, [location.search]);
  return (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
};

export const LogoutFailed = () => {
  return <div>Đã xãy ra lỗi trong quá trình đăng xuất</div>;
};
