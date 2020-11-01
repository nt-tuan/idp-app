import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Tabs, Tab, Icon, Popover } from "@blueprintjs/core";
import { Spinner, Header, toastError } from "components/Core";
import { OutlineButton } from "components/Core/Button";
import { ErrorMessage } from "components/Core/ErrorMessage";
import { toastSuccess } from "components/Core/toaster";
import { EditIcon } from "components/Icon/Icons";
import { RoleCreatorButton } from "components/Role/RoleCreatorButton";
import { UserRolesEditor } from "components/User/UserRolesEditor";
import { UserLayoutContext } from "pages/admin/UserAdmin";
import React from "react";
import Avatar from "react-avatar";
import { RequestError } from "resources/apis/api";
import { userAPI } from "resources/apis/user";
import { IRole } from "resources/models/role";
import { isUserLocked, IUser } from "resources/models/user";
import { LockUser } from "./LockUser";
import { UnlockUser } from "./UnlockUser";
import { UserInfoEditor } from "./UserInfoEditor";
export const UserViewerConsumer = () => {
  const { user: ctxUser, roles, setRoles, refreshUser } = React.useContext(
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
  const handleCreatedRole = (role: IRole) => {
    toastSuccess(<div>Thêm vai trò {role.name} thành công.</div>);
    setRoles((roles) => [...roles, role]);
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
      extrasGeneral={
        <Popover
          content={
            <div className="flex flex-col divide-y pt-2 px-2">
              <OutlineButton className="py-2" onClick={handleResetPassword}>
                <Icon iconSize={12} className="mr-2" icon="refresh" /> Reset
                password
              </OutlineButton>
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
              {!editing && (
                <OutlineButton
                  className="py-2"
                  onClick={() => setEditing(true)}
                >
                  <EditIcon className="w-4 h-4 mr-1" /> Sửa
                </OutlineButton>
              )}
              {editing && (
                <>
                  <OutlineButton className="py-2" onClick={handleSave}>
                    Lưu
                  </OutlineButton>
                  <OutlineButton onClick={() => refreshUser()} className="py-2">
                    Hủy
                  </OutlineButton>
                </>
              )}
            </div>
          }
        >
          <OutlineButton>
            <Icon icon="menu" />
          </OutlineButton>
        </Popover>
      }
      extrasRoles={<RoleCreatorButton onSuccess={handleCreatedRole} />}
      onRevoked={revokeRole}
      onGranted={grantRole}
      onRoleCreated={handleCreatedRole}
    />
  );
};
interface Props {
  allRoles: IRole[];
  userRoles: string[];
  user: IUser;
  extrasGeneral?: React.ReactNode;
  extrasRoles?: React.ReactNode;
  onRevoked?: (role: string) => void;
  onGranted?: (role: string) => void;
  onChange?: (user: IUser) => void;
  onRoleCreated?: (role: IRole) => void;
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

const UserViewMobile = (props: Props) => {
  const [selectedTabId, setSelectedTabId] = React.useState<React.ReactText>(
    "general"
  );
  const extras = React.useMemo(() => {
    if (selectedTabId === "general") return props.extrasGeneral;
    if (selectedTabId === "roles") return props.extrasRoles;
    return <></>;
  }, [props, selectedTabId]);
  return (
    <>
      {props.error && <ErrorMessage {...props.error} />}
      <Tabs
        selectedTabId={selectedTabId}
        onChange={(newTab) => setSelectedTabId(newTab)}
      >
        <Tab title="Chung" id="general" panel={<GeneralInfo {...props} />} />
        <Tab
          title="Vai trò"
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
        <Tab title="Truy cập" id="access" panel={<AccessLogs {...props} />} />
        <Tabs.Expander />
        {extras}
      </Tabs>
    </>
  );
};

export const UserViewDesktop = (props: Props) => {
  return (
    <>
      <div className="flex flex-row flex-wrap xl:divide-x">
        <div className="flex flex-col w-full pb-10 xl:w-1/2 xl:pr-4 xl:pb-0">
          <Header extras={props.extrasGeneral}>Thông tin chung</Header>
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
        {props.onRoleCreated && (
          <div className="flex flex-col w-full xl:w-1/2 xl:pl-4">
            <Header extras={props.extrasRoles}>Vai trò</Header>
            <div className="flex-1 overflow-y-auto">
              <UserRolesEditor
                allRoles={props.allRoles}
                roles={props.userRoles}
                onGranted={props.onGranted}
                onRevoked={props.onRevoked}
              />
            </div>
          </div>
        )}
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

export const UserViewer = (props: Props) => {
  return (
    <>
      {props.error && <ErrorMessage {...props.error} />}
      <div className="block sm:hidden">
        <UserViewMobile {...props} />
      </div>
      <div className="hidden sm:block">
        <UserViewDesktop {...props} />
      </div>
    </>
  );
};
