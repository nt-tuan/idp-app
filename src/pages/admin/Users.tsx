import React from "react";
import { UserList } from "components/user/UserList";
import { Layout2 } from "components/layout/Layout2";

export const UsersPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <Layout2 main={<UserList />} />
      </div>
    </div>
  );
};
