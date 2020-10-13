import { AuthenticationContext } from "@axa-fr/react-oidc-context";
import React from "react";
import { meAPI } from "resources/apis/me";
import { IUser } from "resources/models/user";

export const MyUserInfor = () => {
  const { oidcUser } = React.useContext(AuthenticationContext);
  const [user, setUser] = React.useState<IUser>();
  React.useEffect(() => {
    if (oidcUser == null) return;
    meAPI.get(oidcUser);
  }, [oidcUser]);

  if (oidcUser == null) return <></>;
  return <></>;
};
