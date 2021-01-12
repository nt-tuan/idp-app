import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Breadscrumbs, newBreadscrumb } from "components/core";
import { UserSelect } from "components/user/UserSelect";
import { Layout2 } from "components/layout/Layout2";
import React from "react";
import { userAPI } from "resources/apis/user";
import { IUser } from "resources/models/user";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { User } from "oidc-client";
import { IRole } from "resources/models/role";
import { RequestError } from "resources/apis/api";
import { ErrorMessage } from "components/core/ErrorMessage";
import { adminRoutes } from "routes";
import { UsersRoute, UserViewRoute } from "routes/admin";
interface UserLayoutContextProps {
  users: IUser[];
  roles: IRole[];
  user?: IUser;
  refreshUser: () => void;
  onUserChange: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  setRoles: React.Dispatch<React.SetStateAction<IRole[]>>;
}
type TParams = { id: string };
export const UserLayoutContext = React.createContext<UserLayoutContextProps>({
  roles: [],
  users: [],
  refreshUser: () => {},
  onUserChange: () => {},
  setUsers: () => [],
  setRoles: () => [],
});
const initialLoad = async (oidcUser: User) => {
  const users = await userAPI.list(oidcUser, 0, 100, "id", 1);
  const roles = await userAPI.getRoles(oidcUser);
  return { users, roles };
};
export const UserAdmin = (props: RouteComponentProps<TParams>) => {
  return <UserAdminWrapped {...props} />;
};

const UserAdminWrapped = ({ match }: RouteComponentProps<TParams>) => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [user, setUser] = React.useState<IUser>();
  const [roles, setRoles] = React.useState<IRole[]>([]);
  const [error, setError] = React.useState<RequestError>();
  const { oidcUser } = useReactOidc();

  React.useEffect(() => {
    if (oidcUser == null) return;
    initialLoad(oidcUser).then(({ users, roles }) => {
      setUsers(users);
      setRoles(roles);
    });
  }, [oidcUser]);
  const refreshUser = React.useCallback(() => {
    if (match?.params?.id == null || oidcUser == null) return;
    const id = match.params.id;
    userAPI
      .get(oidcUser, id)
      .then((changed) => {
        setUser(changed);
        setUsers((users) =>
          users.map((user) => (user.id === changed.id ? changed : user))
        );
      })
      .catch(setError);
  }, [oidcUser, match]);
  React.useEffect(() => {
    setUser(undefined);
    refreshUser();
  }, [refreshUser]);
  const breadscrumbs = React.useMemo(() => {
    const bs = [
      newBreadscrumb(UsersRoute),
      ...(user
        ? [
            {
              text: user.username,
              href: UserViewRoute.getPath(user.id),
              active: true,
            },
          ]
        : []),
    ];

    return bs;
  }, [user]);
  if (error != null) return <ErrorMessage {...error} />;
  return (
    <UserLayoutContext.Provider
      value={{
        users,
        roles,
        user,
        refreshUser,
        setUsers,
        setRoles,
        onUserChange: setUser,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="hidden pb-2 pl-5 sm:block">
          <Breadscrumbs breadcrumbs={breadscrumbs} />
        </div>
        <div className="flex flex-1">
          <Layout2
            left={<UserSelect users={users} selected={user} />}
            main={
              <Switch>
                {adminRoutes.map((route) => (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.render}
                  />
                ))}
              </Switch>
            }
          />
        </div>
      </div>
    </UserLayoutContext.Provider>
  );
};
