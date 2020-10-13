import { useReactOidc } from "@axa-fr/react-oidc-context";
import { Breadscrumbs, newBreadscrumb } from "components/Core";
import { UserMenu } from "components/User/UserMenu";
import { Layout2 } from "components/Layout/Layout2";
import React from "react";
import { userAPI } from "resources/apis/user";
import { IUser } from "resources/models/user";
import { adminRoutes } from "./routes";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
interface UserLayoutContextProps {
  users: IUser[];
  user?: IUser;
  onUserChange: (user: IUser) => void;
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}
type TParams = { id: string };
export const UserLayoutContext = React.createContext<UserLayoutContextProps>({
  users: [],
  onUserChange: () => {},
  setUsers: () => [],
});
export const UserAdmin = (props: RouteComponentProps<TParams>) => {
  React.useEffect(() => {
    console.log("mount users wrapper");
    return () => {
      console.log("unmount users wrapper");
    };
  }, []);

  return <UserAdminWrapped {...props} />;
};
const UserAdminWrapped = ({ match }: RouteComponentProps<TParams>) => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [user, setUser] = React.useState<IUser>();
  const { oidcUser } = useReactOidc();
  React.useEffect(() => {
    console.log("mount users");
    return () => {
      console.log("unmount users");
    };
  }, []);
  React.useEffect(() => {
    userAPI.list(oidcUser, 0, 10, "id", 1).then((users) => {
      setUsers(users);
    });
  }, [oidcUser]);
  React.useEffect(() => {
    if (match?.params?.id == null) return;
    const id = match.params.id;
    userAPI.get(oidcUser, id).then(setUser);
  }, [oidcUser, match]);
  const breadscrumbs = React.useMemo(() => {
    const bs = [
      newBreadscrumb(adminRoutes.UsersRoute),
      ...(user
        ? [
            {
              text: user.username,
              href: adminRoutes.User.View.getPath(user.id),
              active: true,
            },
          ]
        : []),
    ];

    return bs;
  }, [user]);
  const onUserChange = (user: IUser) => {
    setUser(user);
  };
  return (
    <UserLayoutContext.Provider value={{ users, user, setUsers, onUserChange }}>
      <div className="flex flex-col h-full">
        <div className="pl-4">
          <Breadscrumbs breadscrumbs={breadscrumbs} />
        </div>
        <div className="flex flex-1">
          <Layout2
            left={<UserMenu users={users} selected={user} />}
            main={
              <Switch>
                <Route
                  path={adminRoutes.User.Edit.path}
                  exact
                  render={adminRoutes.User.Edit.render}
                />
                <Route
                  path={adminRoutes.User.View.path}
                  exact
                  render={adminRoutes.User.View.render}
                />
                <Route
                  path={adminRoutes.CreateUserRoute.path}
                  exact
                  component={adminRoutes.CreateUserRoute.render}
                />
              </Switch>
            }
          />
        </div>
      </div>
    </UserLayoutContext.Provider>
  );
};
