import React, { useContext, useEffect } from "react";
import { OAuthContext } from "./OAuthProvider";
import { LoginButton } from "./LoginButton";

export const PrivateRoute = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) => {
  const { user } = useContext(OAuthContext);
  if (user === undefined) {
    return (
      <div>
        Bạn không đủ quyền truy cập vào trang này
        <LoginButton />
      </div>
    );
  }
  return <>{children}</>;
};
