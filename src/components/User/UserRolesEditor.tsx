import React from "react";
import { IRole, UserRolesProps } from "resources/models/role";
import { Checkbox } from "@blueprintjs/core";

interface Props {
  allRoles: IRole[];
  roles: string[];
  onGranted?: (role: string) => void;
  onRevoked?: (role: string) => void;
}

export const UserRolesEditor = ({
  roles,
  allRoles,
  onGranted,
  onRevoked,
}: Props) => {
  const readOnly = React.useMemo(() => onGranted == null || onRevoked == null, [
    onGranted,
    onRevoked,
  ]);
  const handleCheckedChange = React.useCallback(
    (change: UserRolesProps) => {
      if (change.has) {
        onRevoked && onRevoked(change.name);
        return;
      }
      onGranted && onGranted(change.name);
    },
    [onRevoked, onGranted]
  );
  const userRoles: UserRolesProps[] = React.useMemo(
    () =>
      allRoles.map((role) => {
        const filter = roles.filter((userRole) => userRole === role.name);
        const has = filter.length > 0;
        return { ...role, has };
      }),
    [roles, allRoles]
  );
  return (
    <>
      <div className="flex flex-col divide-y">
        {userRoles?.map((role, index) => (
          <div key={index} className="py-1">
            <Checkbox
              className="mb-0"
              readOnly={readOnly}
              checked={role.has}
              onClick={() => handleCheckedChange(role)}
            >
              <b>{role.name}</b>
            </Checkbox>
            <div className="pb-2">
              <i>{role.description}</i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
