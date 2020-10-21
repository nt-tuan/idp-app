import React from "react";
import { Checkbox, FormGroup, Icon, InputGroup } from "@blueprintjs/core";
import { CreatedUser, IUser } from "resources/models/user";
import { UserRolesEditor } from "./UserRolesEditor";
import { userAPI } from "resources/apis/user";
import { toastError, Header } from "components/Core";
import { DatePicker } from "@blueprintjs/datetime";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { useHistory } from "react-router-dom";
import { UserLayoutContext } from "pages/admin/UserAdmin";
import { routes } from "routes";
import { OutlineButton } from "components/Core/Button";
interface Props {
  onChange: (user: IUser) => void;
  onClose?: () => void;
}
export const UserCreatorConsumer = () => {
  const { setUsers } = React.useContext(UserLayoutContext);
  const history = useHistory();
  const handleChange = (user: IUser) => {
    setUsers((users) => [...users, user]);
    history.push(routes.UserViewRoute.getPath(user.id));
  };
  const handleClose = () => {
    history.push(routes.UsersRoute.getPath(undefined));
  };
  return (
    <UserCreator onChange={handleChange} onClose={handleClose}></UserCreator>
  );
};

export const UserCreator = ({ onChange, onClose }: Props) => {
  const { roles } = React.useContext(UserLayoutContext);
  const { oidcUser } = useReactOidc();
  const [user, setUser] = React.useState<CreatedUser>({
    username: "",
    email: "",
    password: "",
    roles: [],
    lockoutEnable: false,
  });
  const handleGrantRole = (grantedRole: string) => {
    setUser((user) => ({ ...user, roles: [...user.roles, grantedRole] }));
  };
  const handleRevokeRole = (revokedRole: string) => {
    setUser((user) => ({
      ...user,
      roles: user.roles.filter((role) => role !== revokedRole),
    }));
  };
  const handleSave = () => {
    userAPI.create(oidcUser, user).then(onChange).catch(toastError);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };
  const handleLockoutChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUser((user) => ({ ...user, lockoutEnable: !user.lockoutEnable }));
  };
  const handleLockoutEndChange = (data: Date) => {};
  return (
    <div className="h-full px-4 py-2">
      <Header
        extras={
          <div>
            <OutlineButton onClick={handleSave}>
              <Icon icon="floppy-disk" /> Lưu
            </OutlineButton>
            {onClose && (
              <OutlineButton onClick={onClose}>
                <Icon icon="cross" /> Đóng
              </OutlineButton>
            )}
          </div>
        }
      >
        Tạo tài khoản mới
      </Header>
      <FormGroup label="Tên tài khoản">
        <InputGroup
          id="username"
          name="username"
          placeholder="Tên tài khoản"
          value={user.username}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup label="Mật khẩu">
        <InputGroup
          id="password"
          name="password"
          placeholder="Mật khẩu"
          value={user.password}
          type="password"
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup label="Email">
        <InputGroup
          id="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Checkbox
        checked={user.lockoutEnable}
        label="Enabled"
        onChange={handleLockoutChange}
      />
      {user.lockoutEnable && user.lockoutEnd && (
        <DatePicker onChange={handleLockoutEndChange} value={user.lockoutEnd} />
      )}
      <Header className="mt-10">Vai trò</Header>
      <UserRolesEditor
        allRoles={roles}
        roles={user.roles}
        onGranted={handleGrantRole}
        onRevoked={handleRevokeRole}
      />
    </div>
  );
};
