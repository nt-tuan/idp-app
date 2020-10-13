import { TextButton } from "components/Core";
import React, { useCallback } from "react";

export const LogoutButton = () => {
  const handleLogout = useCallback(() => {
    const url = `${process.env.REACT_APP_AUTH_URL}/oauth2/sessions/logout`;
    window.location.href = url;
  }, []);
  return <TextButton onClick={handleLogout}>Đăng xuất</TextButton>;
};
