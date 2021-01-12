import { useReactOidc } from "@axa-fr/react-oidc-context";
import { AnchorButton } from "@blueprintjs/core";
import { Spinner } from "components/core";
import { EditingUserInfo } from "components/user/UserInfoEditor";
import { UserViewer } from "components/user/UserViewer";
import React from "react";
import { RequestError } from "resources/apis/api";
import { getImageLink, upload } from "resources/apis/imageAPI";
import { meAPI } from "resources/apis/me";
import { Consent } from "resources/models/consent";
import { IRole } from "resources/models/role";
import { IUser, UserSignInLog } from "resources/models/user";

export const Home = () => {
  const [user, setUser] = React.useState<IUser>();
  const [editingUser, setEditingUser] = React.useState<EditingUserInfo>();
  const [roles, setRoles] = React.useState<IRole[]>([]);
  const { oidcUser } = useReactOidc();
  const [logs, setLogs] = React.useState<UserSignInLog[]>();
  const [sessions, setSessions] = React.useState<Consent.ConsentSession[]>();
  const [err, setErr] = React.useState<RequestError>();
  React.useEffect(() => {
    if (oidcUser == null) return;
    const load = async () => {
      const user = await meAPI.get(oidcUser);
      const roles = await meAPI.getAllRoles(oidcUser);
      const logs = await meAPI.getAccessLogin(oidcUser);
      const sessions = await meAPI.getConsentSession(oidcUser);
      setUser(user);
      setRoles(roles);
      setLogs(logs);
      setSessions(sessions);
    };
    load().catch(setErr);
  }, [oidcUser]);
  const handleRevokeSession = async (clientId: string) => {
    try {
      setSessions(undefined);
      await meAPI.revokeSession(clientId, oidcUser);
      const sessions = await meAPI.getConsentSession(oidcUser);
      setSessions(sessions);
    } catch (e) {
      setErr(e);
    }
  };
  const handleSave = async () => {
    if (editingUser == null) return;
    try {
      if (editingUser.previewImage != null) {
        const image = await upload(
          `user/${oidcUser.profile.sub}/${editingUser.previewImage.name}`,
          editingUser.previewImage,
          oidcUser.access_token
        );
        editingUser.image = getImageLink(image);
      }
      const updatedUser = await meAPI.update(oidcUser, editingUser);
      setUser((user) => (user ? { ...updatedUser, roles: user.roles } : user));
      setEditingUser(undefined);
    } catch (e) {
      setErr(e);
    }
  };
  const refreshUser = async () => {
    const user = await meAPI.get(oidcUser);
    setUser(user);
    setEditingUser(undefined);
  };
  if (user == null)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  return (
    <UserViewer
      user={user}
      userRoles={user.roles}
      allRoles={roles}
      accessLogs={logs}
      sessionConsents={sessions}
      onSessionRevoke={handleRevokeSession}
      error={err}
      onChange={setEditingUser}
      editingUser={editingUser}
      onSave={handleSave}
      onCancel={refreshUser}
      extrasGeneral={
        <>
          {editingUser && (
            <AnchorButton minimal onClick={refreshUser} className="py-2">
              Hủy
            </AnchorButton>
          )}
          {!editingUser && (
            <AnchorButton
              className="py-2"
              onClick={() => setEditingUser(user)}
              icon="edit"
            >
              Sửa
            </AnchorButton>
          )}
        </>
      }
    />
  );
};
