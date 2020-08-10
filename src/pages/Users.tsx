import React, { useState, useEffect } from "react";
import { Roles } from "components/Roles";
import { PrivateRoute } from "components/PrivateRoute";
import { UserProps } from "resources/userModel";
import { user } from "resources/user";
import { Classes, HTMLTable } from "@blueprintjs/core";

export const LoadingUser = () => {
  return (
    <div>
      <h3 className={Classes.SKELETON}></h3>
      <p className={Classes.SKELETON}></p>
    </div>
  );
};

export const Users = () => {
  const [users, setUsers] = useState<UserProps[]>();
  const [selectedUser, setSelectedUSer] = useState<UserProps>();
  useEffect(() => {
    user.list().then(setUsers);
  }, []);
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
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1 1 auto" }}>
          <HTMLTable condensed striped interactive style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Tài khoản</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr onClick={() => setSelectedUSer(user)}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </HTMLTable>
        </div>
        <div style={{ flexBasis: "200px" }}>
          {selectedUser && <Roles roleNames={selectedUser.roles} />}
        </div>
      </div>
    </PrivateRoute>
  );
};
