import React from "react";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { AnchorButton, Icon, Popover } from "@blueprintjs/core";
import { Spinner, toastError } from "components/utils";
import { toastSuccess } from "components/utils/toaster";
import { RoleCreatorButton } from "components/role/RoleCreatorButton";
import { UserLayoutContext } from "pages/admin/UserAdmin";
import { RequestError } from "resources/apis/api";
import { userAPI } from "resources/apis/user";
import { IRole } from "resources/models/role";
import { isUserLocked, IUser, UserSignInLog } from "resources/models/user";
import { LockUser } from "components/user/LockUser";
import { UnlockUser } from "components/user/UnlockUser";
import { UserViewer } from "components/user";
import { Consent } from "resources/models/consent";
import { EditingUserInfo } from "components/user/UserInfoEditor";
import { useAuthorize } from "components/identity/useAuthorize";

export const UserViewerConsumer = () => {
  const { user: ctxUser, roles, setRoles, refreshUser } = React.useContext(
    UserLayoutContext
  );
  const [editingUser, setEditingUser] = React.useState<EditingUserInfo>();
  const [user, setUser] = React.useState<IUser | undefined>(ctxUser);
  const [userRoles, setUserRoles] = React.useState<string[]>(
    ctxUser?.roles ?? []
  );
  const [accessLogs, setAccessLogs] = React.useState<UserSignInLog[]>();
  const [sessions, setSessions] = React.useState<Consent.ConsentSession[]>();
  const [error, setError] = React.useState<RequestError>();
  const { oidcUser } = useReactOidc();
  const isLocked = React.useMemo(() => (user ? isUserLocked(user) : true), [
    user,
  ]);
  const grantRole = (grantedRole: string) => {
    if (user == null) return;
    userAPI
      .grantRole(oidcUser, user.id, grantedRole)
      .then(() =>
        toastSuccess(
          <div>
            Đã cấp vai trò <b>{grantedRole}</b> cho tài khoản{" "}
            <b>{user.username}</b>
          </div>
        )
      )
      .then(() => {
        const roles = [...userRoles, grantedRole];
        setUserRoles(roles);
      })
      .catch(toastError);
  };
  const revokeRole = (revokedRole: string) => {
    if (user == null) return;
    userAPI
      .revokeRole(oidcUser, user.id, revokedRole)
      .then(() =>
        toastSuccess(
          <div>
            Đã thu hồi vai trò <b>{revokedRole}</b> của tài khoản{" "}
            <b>{user.username}</b>
          </div>
        )
      )
      .then(() => {
        const roles = userRoles.filter((role) => role !== revokedRole);
        setUserRoles(roles);
      })
      .catch(toastError);
  };
  const handleSave = React.useCallback(() => {
    if (user == null) return;
    userAPI
      .update(oidcUser, user.id, user)
      .then(setUser)
      .then(() =>
        toastSuccess(
          <div>
            Đã lưu thông tin tài khoản <b>{user.username}</b>
          </div>
        )
      )
      .catch(setError);
  }, [user, oidcUser]);
  const handleResetPassword = React.useCallback(() => {
    if (user == null) return;
    userAPI
      .resetPassword(oidcUser, user.id)
      .then((psw) =>
        toastSuccess(
          <div>
            Password mới của tài khoản <b>{user.username}</b> là{" "}
            <b>{psw.password}</b>
          </div>,
          0
        )
      )
      .catch(toastError);
  }, [user, oidcUser]);
  const handleCreatedRole = (role: IRole) => {
    toastSuccess(<div>Thêm vai trò {role.name} thành công.</div>);
    setRoles((roles) => [...roles, role]);
  };
  const handleRevokeSession = async (clientId: string) => {
    if (user == null) return;
    setSessions(undefined);
    await userAPI.revokeSession(user.id, clientId, oidcUser);
    const sessions = await userAPI.getConsentSession(user.id, oidcUser);
    setSessions(sessions);
  };
  const { canEdit } = useAuthorize();
  React.useEffect(() => {
    if (user == null) return;
    const load = async () => {
      const sessions = await userAPI.getConsentSession(user.id, oidcUser);
      const logs = await userAPI.getAccessLogs(user.id, oidcUser);
      setSessions(sessions);
      setAccessLogs(logs);
    };
    load().catch(setError);
  }, [oidcUser, user]);
  const renderActions = React.useCallback(() => {
    if (!canEdit) return undefined;
    if (user == null) return undefined;
    return (
      <Popover
        content={
          <div className="flex flex-col divide-y pt-2 px-2">
            <AnchorButton
              alignText="left"
              minimal
              icon="refresh"
              className="pr-2"
              onClick={handleResetPassword}
            >
              Reset password
            </AnchorButton>
            {isLocked ? (
              <UnlockUser
                className="py-2"
                oidcUser={oidcUser}
                userId={user.id}
                onChange={refreshUser}
              />
            ) : (
              <LockUser
                className="py-2"
                oidcUser={oidcUser}
                userId={user.id}
                onChange={refreshUser}
              />
            )}

            {!editingUser && (
              <AnchorButton
                alignText="left"
                minimal
                className="py-2"
                icon="edit"
                onClick={() => setEditingUser(user)}
              >
                Sửa
              </AnchorButton>
            )}
            {editingUser && (
              <>
                <AnchorButton
                  alignText="left"
                  icon="floppy-disk"
                  minimal
                  className="py-2"
                  onClick={handleSave}
                >
                  Lưu
                </AnchorButton>
                <AnchorButton
                  alignText="left"
                  icon="cross"
                  minimal
                  onClick={() => refreshUser()}
                  className="py-2"
                >
                  Hủy
                </AnchorButton>
              </>
            )}
          </div>
        }
      >
        <AnchorButton>
          <Icon icon="menu" />
        </AnchorButton>
      </Popover>
    );
  }, [
    canEdit,
    isLocked,
    editingUser,
    handleResetPassword,
    refreshUser,
    handleSave,
    user,
    oidcUser,
  ]);
  if (user == null) return <Spinner />;
  return (
    <UserViewer
      user={user}
      userRoles={userRoles}
      allRoles={roles}
      onChange={canEdit ? setUser : undefined}
      editingUser={editingUser}
      error={error}
      accessLogs={accessLogs}
      sessionConsents={sessions}
      onSessionRevoke={canEdit ? handleRevokeSession : undefined}
      extrasGeneral={renderActions()}
      extrasRoles={
        canEdit ? (
          <RoleCreatorButton onSuccess={handleCreatedRole} />
        ) : undefined
      }
      onRevoked={revokeRole}
      onGranted={grantRole}
    />
  );
};
