import { AnchorButton } from "@blueprintjs/core";
import React, { useCallback } from "react";
export const LogoutButton = () => {
  const handleLogout = useCallback(() => {
    const url = `${process.env.REACT_APP_AUTH_URL}/oauth2/sessions/logout`;
    window.location.href = url;
  }, []);
  return (
    <AnchorButton minimal onClick={handleLogout}>
      Đăng xuất
    </AnchorButton>
  );
};
