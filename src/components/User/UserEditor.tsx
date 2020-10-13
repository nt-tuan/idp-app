import React from "react";
import { UserRolesEditor } from "components/User/UserRolesEditor";
import { isUserLocked, IUser } from "resources/models/user";
import { userAPI } from "resources/apis/user";
import { RequestError } from "resources/apis/api";
import { Header, AppToaster, toastError } from "components/Core";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { adminRoutes } from "pages/admin/routes";
import { Link } from "react-router-dom";
import { UserLayoutContext } from "pages/admin/UserAdmin";
import { Button, Spinner } from "components/Core";
interface Props {
  user: IUser;
  onChange: (user: IUser) => void;
}
export const UserEditorConsumer = () => {
  const { user, onUserChange } = React.useContext(UserLayoutContext);
  if (user == null) return <Spinner />;
  return <UserEditor user={user} onChange={onUserChange} />;
};
export const UserEditor = ({ user, onChange }: Props) => {
  const locked = React.useMemo(() => isUserLocked(user), [user]);
  const { oidcUser } = useReactOidc();
  const handleLock = () => {
    userAPI
      .lock(oidcUser, user.id)
      .then(() => userAPI.get(oidcUser, user.id))
      .then(onChange)
      .catch(toastError);
  };
  const handleUnlock = () => {
    userAPI
      .unlock(oidcUser, user.id)
      .then(() => userAPI.get(oidcUser, user.id))
      .then(onChange)
      .catch(toastError);
  };
  const grantRole = (grantedRole: string) => {
    userAPI
      .grantRole(oidcUser, user.id, grantedRole)
      .then(() => {
        const roles = [...user.roles, grantedRole];
        console.log(roles);
        onChange({ ...user, roles });
      })
      .catch((err: RequestError) =>
        AppToaster.show({ message: err.message, intent: "danger" })
      );
  };
  const revokeRole = (revokedRole: string) => {
    userAPI
      .revokeRole(oidcUser, user.id, revokedRole)
      .then(() => {
        const roles = user.roles.filter((role) => role !== revokedRole);
        onChange({ ...user, roles });
      })
      .catch((err: RequestError) =>
        AppToaster.show({ message: err.message, intent: "danger" })
      );
  };
  console.log(user);
  return (
    <>
      <Header
        extras={
          <div>
            {locked ? (
              <Button className="mr-1" onClick={handleUnlock}>
                Unlock
              </Button>
            ) : (
              <Button className="mr-1" onClick={handleLock}>
                Lock
              </Button>
            )}
            <Link to={adminRoutes.User.View.getPath(user.id)}>
              <Button>Đóng</Button>
            </Link>
          </div>
        }
      >
        Cập nhật tài khoản <b>{user.username}</b>
      </Header>
      <UserRolesEditor
        roles={user.roles}
        onGranted={grantRole}
        onRevoked={revokeRole}
      />
    </>
  );
};
