import { Spinner, Header, Button } from "components/Core";
import { EditIcon } from "components/Icon/Icons";
import { UserRolesEditor } from "components/User/UserRolesEditor";
import { adminRoutes } from "pages/admin/routes";
import { UserLayoutContext } from "pages/admin/UserAdmin";
import React from "react";
import { Link } from "react-router-dom";
import { IUser } from "resources/models/user";
export const UserViewerConsumer = () => {
  const { user } = React.useContext(UserLayoutContext);
  if (user == null) return <Spinner />;
  return (
    <UserViewer
      user={user}
      extras={
        <>
          <div>
            <Link to={adminRoutes.User.Edit.getPath(user.id)}>
              <Button className="mr-1">
                <EditIcon className="w-5 h-5 pr-2" /> Edit
              </Button>
            </Link>
          </div>
        </>
      }
    />
  );
};
interface Props {
  user: IUser;
  extras?: React.ReactNode;
}
export const UserViewer = ({ user, extras }: Props) => {
  return (
    <>
      <Header extras={extras}>
        Thông tin <b>{user.username}</b>
      </Header>
      <Header>Vai trò trong hệ thống</Header>
      <UserRolesEditor roles={user.roles} />
    </>
  );
};
