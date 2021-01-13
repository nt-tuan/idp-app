import React, { useCallback, useState, useEffect } from "react";
import { isUserLocked, IUser } from "resources/models/user";
import { userAPI } from "resources/apis/user";
import { Button, Classes, HTMLTable, Icon } from "@blueprintjs/core";
import { Header } from "components/utils";
import { Link, useHistory } from "react-router-dom";
import { useReactOidc } from "@axa-fr/react-oidc-context";
import { UserCreateRoute, UserViewRoute } from "routes/admin";
import { useAuthorize } from "components/identity/useAuthorize";
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
  const { canEdit } = useAuthorize();
  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex-1">
        <Header
          extras={
            canEdit ? (
              <Link to={UserCreateRoute.path}>
                <Button icon="add">Thêm tài khoản</Button>
              </Link>
            ) : undefined
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
                onClick={() => history.push(UserViewRoute.getPath(user.id))}
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
