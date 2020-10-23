import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Tabs, Tab, Icon } from "@blueprintjs/core";
import { Spinner, Header, toastError } from "components/Core";
import { OutlineButton } from "components/Core/Button";
import { ErrorMessage } from "components/Core/ErrorMessage";
import { toastSuccess } from "components/Core/toaster";
import { EditIcon } from "components/Icon/Icons";
import { UserRolesEditor } from "components/User/UserRolesEditor";
import { UserLayoutContext } from "pages/admin/UserAdmin";
import React from "react";
import Avatar from "react-avatar";
import { RequestError } from "resources/apis/api";
import { userAPI } from "resources/apis/user";
import { RolesProps } from "resources/models/role";
import { isUserLocked, IUser } from "resources/models/user";
import { LockUser } from "./LockUser";
import { UnlockUser } from "./UnlockUser";
import { UserInfoEditor } from "./UserInfoEditor";
export const UserViewerConsumer = () => {
  const { user: ctxUser, roles, refreshUser } = React.useContext(
    UserLayoutContext
  );
  const [editing, setEditing] = React.useState(false);
  const [user, setUser] = React.useState<IUser | undefined>(ctxUser);
  const [userRoles, setUserRoles] = React.useState<string[]>(
    ctxUser?.roles ?? []
  );
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
  const handleSave = () => {
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
  };
  const handleResetPassword = () => {
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
  };
  if (user == null) return <Spinner />;
  return (
    <UserViewer
      user={user}
      userRoles={userRoles}
      allRoles={roles}
      onChange={setUser}
      editing={editing}
      error={error}
      extras={
        <div className="flex flex-row items-center">
          <OutlineButton onClick={handleResetPassword}>
            <Icon className="mr-1" icon="refresh" /> Reset password
          </OutlineButton>
          {isLocked ? (
            <UnlockUser
              oidcUser={oidcUser}
              userId={user.id}
              onChange={refreshUser}
            />
          ) : (
            <LockUser
              oidcUser={oidcUser}
              userId={user.id}
              onChange={refreshUser}
            />
          )}
          {!editing && (
            <OutlineButton onClick={() => setEditing(true)} className="mr-1">
              <EditIcon className="w-5 h-5 mr-1" /> Sửa
            </OutlineButton>
          )}
          {editing && (
            <>
              <OutlineButton onClick={handleSave} className="mr-1">
                Lưu
              </OutlineButton>
              <OutlineButton onClick={() => refreshUser()} className="mr-1">
                Hủy
              </OutlineButton>
            </>
          )}
        </div>
      }
      onRevoked={revokeRole}
      onGranted={grantRole}
    />
  );
};
interface Props {
  allRoles: RolesProps[];
  userRoles: string[];
  user: IUser;
  extras?: React.ReactNode;
  onRevoked?: (role: string) => void;
  onGranted?: (role: string) => void;
  onChange?: (user: IUser) => void;
  editing?: boolean;
  error?: RequestError;
}
const Field = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-row items-baseline">
    <div className="w-32">{label}</div>
    {value ? (
      <div className="font-bold">{value}</div>
    ) : (
      <i className="text-gray-500">(Không có)</i>
    )}
  </div>
);
const GeneralInfo = ({ user }: Props) => {
  return (
    <div className="flex flex-row">
      <Avatar name={user.username} src={user.image} round />
      <div className="flex flex-col justify-center pl-4">
        <div className="font-bold">ID {user.id}</div>
        <Field label="Tài khoản" value={user.username} />
        <Field label="Họ tên" value={user.fullname} />
        <Field label="Email" value={user.email} />
        <Field label="Phone" value={user.phone} />
      </div>
    </div>
  );
};

const AccessLogs = ({ user }: Props) => (
  <i>Không có thông tin truy cập của tài khoản này</i>
);

export const UserViewer = (props: Props) => {
  return (
    <>
      {props.error && <ErrorMessage {...props.error} />}
      <div className="block sm:hidden">
        <Tabs defaultSelectedTabId="general">
          <Tab title="Chung" id="general" panel={<GeneralInfo {...props} />} />
          <Tab
            title="Phân quyền"
            id="roles"
            panel={
              <UserRolesEditor
                allRoles={props.allRoles}
                roles={props.user.roles}
                onGranted={props.onGranted}
                onRevoked={props.onRevoked}
              />
            }
          />
          <Tabs.Expander />
          {props.extras}
        </Tabs>
      </div>
      <div className="hidden sm:flex sm:flex-row sm:flex-wrap sm:divide-x">
        <div className="flex flex-col w-full pb-2 xl:w-1/2 xl:pr-2">
          <Header extras={props.extras}>Thông tin chung</Header>
          <div className="flex-1">
            {props.onChange && props.editing ? (
              <UserInfoEditor
                allRoles={props.allRoles}
                user={props.user}
                onChange={props.onChange}
              />
            ) : (
              <GeneralInfo {...props} />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full pb-2 xl:w-1/2 xl:pl-2">
          <Header>Vai trò</Header>
          <div className="flex-1 overflow-y-auto">
            <UserRolesEditor
              allRoles={props.allRoles}
              roles={props.userRoles}
              onGranted={props.onGranted}
              onRevoked={props.onRevoked}
            />
          </div>
        </div>
      </div>
      <div className="w-full pt-10">
        <Header>Lịch sử truy cập</Header>
        <div>
          <AccessLogs {...props} />
        </div>
      </div>
    </>
  );
};
