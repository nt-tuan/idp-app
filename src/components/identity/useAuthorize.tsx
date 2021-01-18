import { useReactOidc } from "@axa-fr/react-oidc-context";
import React from "react";
import { allUserRoles } from "routes/admin";

export const useAuthorize = () => {
  const { oidcUser } = useReactOidc();
  const state = React.useMemo(() => {
    const canEdit = oidcUser?.scopes.includes(allUserRoles.write) ?? false;
    const canView = oidcUser?.scopes.includes(allUserRoles.read) ?? false;
    const isAuthorized = oidcUser != null;
    return { canEdit, canView, isAuthorized };
  }, [oidcUser]);
  return state;
};
