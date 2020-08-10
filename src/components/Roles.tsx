import React, { useEffect, useState } from "react";
import { RolesProps, UserRolesProps } from "resources/roleModel";
import { role } from "resources";
import { AppToaster } from "pages/toaster";
import { RequestError } from "resources/api";
import { Classes, Checkbox } from "@blueprintjs/core";

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

export const Roles = ({ roleNames }: { roleNames: string[] }) => {
  const [roles, setRoles] = useState<UserRolesProps[]>();
  useEffect(() => {
    role
      .getRoles()
      .then((roles) =>
        setRoles(
          roles.map((role) => {
            const filter = roleNames.filter((name) => name === role.name);
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
      {roles?.map((role) => (
        <div>
          <Checkbox checked={role.has} label={role.name} />
          <p className="bp3-text-muted">{role.description}</p>
        </div>
      ))}
    </div>
  );
};
