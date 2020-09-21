import React, { useEffect, useState } from "react";
import { RolesProps, UserRolesProps } from "resources/roleModel";
import { role } from "resources";
import { AppToaster } from "pages/toaster";
import { RequestError } from "resources/api";
import { Classes, Checkbox } from "@blueprintjs/core";
import { user as userAPI } from "resources/user";
import { IUserProps } from "resources/userModel";

const LoadingRoles = () => {
  const loadingLine = () => (
    <div>
      <h3 className={Classes.SKELETON}></h3>
      <p className={Classes.SKELETON}></p>
    </div>
  );
  return (
    <div>
      {loadingLine()}
      {loadingLine()}
      {loadingLine()}
    </div>
  );
};

export const Roles = ({ user }: { user: IUserProps }) => {
  const [roles, setRoles] = useState<UserRolesProps[]>();
  const grantRole = (changedRole: UserRolesProps) => {
    userAPI
      .grantRole(user.id, changedRole.name)
      .then(() => {
        setRoles((roles) =>
          roles?.map((role) => {
            if (role.name == changedRole.name) {
              return { ...role, has: true };
            }
            return role;
          })
        );
      })
      .catch((err: RequestError) =>
        AppToaster.show({ message: err.message, intent: "danger" })
      );
  };
  const revokeRole = (changedRole: UserRolesProps) => {
    userAPI
      .revokeRole(user.id, changedRole.name)
      .then(() => {
        setRoles((roles) =>
          roles?.map((role) => {
            if (role.name == changedRole.name) {
              return { ...role, has: false };
            }
            return role;
          })
        );
      })
      .catch((err: RequestError) =>
        AppToaster.show({ message: err.message, intent: "danger" })
      );
  };
  const handleCheckedChange = (role: UserRolesProps) => {
    const checked = !role.has;
    checked ? grantRole(role) : revokeRole(role);
  };
  useEffect(() => {
    role
      .getRoles()
      .then((roles) =>
        setRoles(
          roles.map((role) => {
            const filter = user.roles.filter(
              (userRole) => userRole === role.name
            );
            const has = filter.length > 0;
            return { ...role, has };
          })
        )
      )
      .catch((err: RequestError) =>
        AppToaster.show({ message: err.message, intent: "danger" })
      );
  }, []);
  if (roles === undefined) return <LoadingRoles />;
  return (
    <div>
      {roles?.map((role, index) => (
        <div key={index}>
          <Checkbox
            checked={role.has}
            label={role.name}
            onClick={() => handleCheckedChange(role)}
          />
          <p className="bp3-text-muted">{role.description}</p>
        </div>
      ))}
    </div>
  );
};
