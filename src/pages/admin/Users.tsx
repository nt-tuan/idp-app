import React from "react";
import { UserList } from "components/User/UserList";
import { AutoBreadscrumbs } from "components/Core";
import { Layout2 } from "components/Layout/Layout2";
import { adminRoutes } from "./routes";

export const UsersPage = () => {
  return (
    <div className="flex flex-col h-full">
      <AutoBreadscrumbs
        routes={[adminRoutes.UsersRoute, adminRoutes.CreateUserRoute]}
      />
      <div className="flex-1">
        <Layout2 main={<UserList />} />
      </div>
    </div>
  );
};
