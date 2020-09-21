import React, { useState, useEffect, useCallback } from "react";
import { Roles } from "components/Roles";
import { PrivateRoute } from "components/PrivateRoute";
import { IUserProps, UserProps } from "resources/userModel";
import { user as userAPI } from "resources/user";
import {
  Classes,
  HTMLTable,
  NonIdealState,
  Button,
  Icon,
} from "@blueprintjs/core";
import { Container, Row, Col } from "react-grid-system";
import { RequestError } from "resources/api";
import { AppToaster, toastError } from "./toaster";

export const LoadingUser = () => {
  return (
    <div>
      <h3 className={Classes.SKELETON}></h3>
      <p className={Classes.SKELETON}></p>
    </div>
  );
};

const SelectdUserRole = ({ selectedUser }: { selectedUser?: IUserProps }) => {
  if (selectedUser == null) {
    return (
      <NonIdealState
        icon="key"
        title="Không có user nào được chọn"
        description="Vui lòng chọn một user để hiển thị các vai trò của user"
      />
    );
  }
  return (
    <div>
      <h3 className="bp3-heading">
        Danh sách vai trò của {selectedUser.username}
      </h3>
      <Roles user={selectedUser} />
    </div>
  );
};

const LockUserButton = ({
  onSuccess,
  user,
}: {
  onSuccess: () => void;
  user: UserProps;
}) => {
  const handleLock = () => {
    userAPI.lock(user.id).then(onSuccess).catch(toastError);
  };
  const handleUnlock = () => {
    userAPI.unlock(user.id).then(onSuccess).catch(toastError);
  };
  if (user.isLock())
    return <Button small minimal icon="unlock" onClick={handleUnlock} />;
  return <Button small minimal icon="lock" onClick={handleLock} />;
};

export const Users = () => {
  const [users, setUsers] = useState<UserProps[]>();
  const [selectedUser, setSelectedUser] = useState<UserProps>();
  const reload = useCallback(() => {
    userAPI.list(0, 10, "id", 1).then((users) => {
      setUsers(users.map((user) => new UserProps(user)));
      if (selectedUser != null) {
        var filtered = users.filter((user) => user.id === selectedUser.id);
        if (filtered.length === 0) setSelectedUser(undefined);
        setSelectedUser(new UserProps(filtered[0]));
      }
    });
  }, [selectedUser]);
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
    <PrivateRoute>
      <Container>
        <Row>
          <Col sm={8}>
            <div style={{ display: "flex" }}>
              <h3 style={{ flexGrow: 1 }} className="bp3-heading">
                Danh sách tài khoản
              </h3>
              <div style={{ textAlign: "right" }}>
                <Button small minimal icon="plus" />
              </div>
            </div>

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
                  <tr onClick={() => setSelectedUser(user)}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isLock() && <Icon intent="danger" icon="lock" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </HTMLTable>
          </Col>
          <Col sm={4}>
            {selectedUser && (
              <LockUserButton user={selectedUser} onSuccess={reload} />
            )}
            <SelectdUserRole selectedUser={selectedUser} />
          </Col>
        </Row>
      </Container>
    </PrivateRoute>
  );
};
