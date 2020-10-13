import React from "react";
import { Button, Checkbox, FormGroup, InputGroup } from "@blueprintjs/core";
import { CreatedUser, IUser } from "resources/models/user";
import { UserRolesEditor } from "./UserRolesEditor";
import { userAPI } from "resources/apis/user";
import { toastError, Header } from "components/Core";
import { DatePicker } from "@blueprintjs/datetime";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { adminRoutes } from "pages/admin/routes";
import { useHistory } from "react-router-dom";
import { UserLayoutContext } from "pages/admin/UserAdmin";
interface Props {
  onChange: (user: IUser) => void;
  onClose?: () => void;
}
export const UserCreatorConsumer = () => {
  const { setUsers } = React.useContext(UserLayoutContext);
  const history = useHistory();
  const handleChange = (user: IUser) => {
    setUsers((users) => [...users, user]);
    history.push(adminRoutes.User.View.getPath(user.id));
  };
  const handleClose = () => {
    history.push(adminRoutes.UsersRoute.getPath());
  };
  return (
    <UserCreator onChange={handleChange} onClose={handleClose}></UserCreator>
  );
};

export const UserCreator = ({ onChange, onClose }: Props) => {
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
    <div className="h-full px-4 py-2 rounded shadow">
      <Header
        extras={
          <div>
            <Button icon="saved" onClick={handleSave} />
            {onClose && <Button icon="cross" onClick={onClose} />}
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
      <UserRolesEditor
        roles={user.roles}
        onGranted={handleGrantRole}
        onRevoked={handleRevokeRole}
      />
    </div>
  );
};
