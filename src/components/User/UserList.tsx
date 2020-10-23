import React, { useCallback, useState, useEffect } from "react";
import { isUserLocked, IUser } from "resources/models/user";
import { userAPI } from "resources/apis/user";
import { Classes, HTMLTable, Icon } from "@blueprintjs/core";
import { Header } from "components/Core";
import { Link, useHistory } from "react-router-dom";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { routes } from "routes";
import { OutlineButton } from "components/Core/Button";
export const LoadingUser = () => {
  return (
    <div>
      <h3 className={Classes.SKELETON}>Loading</h3>
      <p className={Classes.SKELETON}></p>
    </div>
  );
};

interface Props {
  users: IUser[];
  selected?: IUser;
  onSelectedChange: (user?: IUser) => void;
}
const UserListView = ({ users, selected, onSelectedChange }: Props) => {
  const history = useHistory();
  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex-1">
        <Header
          extras={
            <Link to={routes.UserCreateRoute.path}>
              <OutlineButton>
                <Icon icon="plus" />
                Thêm tài khoản
              </OutlineButton>
            </Link>
          }
        >
          Dang sách tài khoản
        </Header>
        <HTMLTable condensed striped interactive style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Tài khoản</th>
              <th>Email</th>
              <th>Bị khóa</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() =>
                  history.push(routes.UserViewRoute.getPath(user.id))
                }
              >
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {isUserLocked(user) && <Icon intent="danger" icon="lock" />}
                </td>
              </tr>
            ))}
          </tbody>
        </HTMLTable>
      </div>
    </div>
  );
};

export const UserList = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [selected, setSelected] = useState<IUser>();
  const ctx = useReactOidc();
  const { oidcUser } = ctx;
  const reload = useCallback(() => {
    userAPI.list(oidcUser, 0, 10, "id", 1).then((users) => {
      setUsers(users);
      setSelected((selected) => {
        if (selected == null) return selected;
        const newSelected = users.filter((user) => user.id === selected.id);
        return newSelected.length > 0 ? newSelected[0] : undefined;
      });
    });
  }, [oidcUser]);
  const handleSelectedChange = React.useCallback((change?: IUser) => {
    setSelected(change);
    if (change == null) return;
    setUsers((users) =>
      users?.map((user) => {
        if (user.id === change.id) return change;
        return user;
      })
    );
  }, []);
  useEffect(() => {
    reload();
  }, [reload]);
  if (users === undefined)
    return (
      <div>
        <LoadingUser />
        <LoadingUser />
        <LoadingUser />
      </div>
    );
  return (
    <UserListView
      users={users}
      selected={selected}
      onSelectedChange={handleSelectedChange}
    />
  );
};
