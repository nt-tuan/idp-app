import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Spinner } from "components/Core";
import { UserViewer } from "components/User/UserViewer";
import React from "react";
import { meAPI } from "resources/apis/me";
import { IUser } from "resources/models/user";

export const Home = () => {
  const [user, setUser] = React.useState<IUser>();
  const { oidcUser } = useReactOidc();
  React.useEffect(() => {
    meAPI.get(oidcUser).then(setUser);
  }, [oidcUser]);
  if (user == null) return <Spinner />;
  return <UserViewer user={user} />;
};
