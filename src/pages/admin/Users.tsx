import React from "react";
import { UserList } from "components/User/UserList";
import { Layout2 } from "components/Layout/Layout2";
import { LayoutContext } from "components/Layout/PageLayout";
import { newBreadscrumb } from "components/Core";
import { routes } from "routes";

export const UsersPage = () => {
  const { setBreadscrumbs } = React.useContext(LayoutContext);
  React.useEffect(() => {
    const bs = [newBreadscrumb(routes.UsersRoute)];
    setBreadscrumbs(bs);
  }, [setBreadscrumbs]);
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <Layout2 main={<UserList />} />
      </div>
    </div>
  );
};
