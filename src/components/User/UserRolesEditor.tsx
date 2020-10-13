import React, { useEffect, useState } from "react";
import { RolesProps, UserRolesProps } from "resources/models/role";
import { Classes, Checkbox } from "@blueprintjs/core";
import { userAPI } from "resources/apis/user";
import { useReactOidc } from "@axa-fr/react-oidc-context";

const LoadingRoles = () => {
  const loadingLine = () => (
    <div>
      <h3 className={Classes.SKELETON}>Loading</h3>
      <p className={Classes.SKELETON}>Loading</p>
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

interface Props {
  roles: string[];
  onGranted?: (role: string) => void;
  onRevoked?: (role: string) => void;
}

export const UserRolesEditor = ({ roles, onGranted, onRevoked }: Props) => {
  const { oidcUser } = useReactOidc();
  const [allRoles, setAllRoles] = React.useState<RolesProps[]>([]);
  const [userRoles, setUserRoles] = useState<UserRolesProps[]>();
  const readOnly = React.useMemo(() => onGranted == null || onRevoked == null, [
    onGranted,
    onRevoked,
  ]);
  const handleCheckedChange = (change: UserRolesProps) => {
    if (change.has) {
      onRevoked && onRevoked(change.name);
      return;
    }
    onGranted && onGranted(change.name);
  };
  useEffect(() => {
    userAPI.getRoles(oidcUser).then(setAllRoles);
  }, [oidcUser]);
  useEffect(() => {
    setUserRoles(
      allRoles.map((role) => {
        const filter = roles.filter((userRole) => userRole === role.name);
        const has = filter.length > 0;
        return { ...role, has };
      })
    );
  }, [allRoles, roles]);
  if (userRoles === undefined) return <LoadingRoles />;
  return (
    <div>
      {userRoles?.map((role, index) => (
        <div key={index}>
          <Checkbox
            readOnly={readOnly}
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
