import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Spinner } from "components/Core";
import { UserViewer } from "components/User/UserViewer";
import React from "react";
import { meAPI } from "resources/apis/me";
import { userAPI } from "resources/apis/user";
import { RolesProps } from "resources/models/role";
import { IUser } from "resources/models/user";

export const Home = () => {
  const [user, setUser] = React.useState<IUser>();
  const [roles, setRoles] = React.useState<RolesProps[]>([]);
  const { oidcUser } = useReactOidc();
  React.useEffect(() => {
    meAPI.get(oidcUser).then(setUser);
    userAPI.getRoles(oidcUser).then(setRoles);
  }, [oidcUser]);
  if (user == null)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  return <UserViewer user={user} userRoles={user.roles} allRoles={roles} />;
};
