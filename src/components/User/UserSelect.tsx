import React from "react";
import { isUserLocked, IUser } from "resources/models/user";
import { Icon, InputGroup } from "@blueprintjs/core";
import cx from "classnames";
import { useHistory } from "react-router-dom";
import { routes } from "routes";
interface Props {
  selected?: IUser;
  users: IUser[];
}
export const UserSelect = ({ selected, users }: Props) => {
  const [query, setQuery] = React.useState("");
  const history = useHistory();

  const filterUsers = React.useMemo(() => {
    if (query == null) return users;
    return users.filter(
      (user) => user.username.match(query) || user.email.match(query)
    );
  }, [users, query]);
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  return (
    <div className="hidden sm:flex sm:flex-col">
      <InputGroup
        type="search"
        className="mb-4"
        value={query}
        onChange={handleQueryChange}
        placeholder="Tìm ..."
      />
      {filterUsers.map((user) => (
        <div
          key={user.username}
          className={cx("px-1 py-1 rounded cursor-pointer", {
            shadow: selected && selected.id === user.id,
            "bg-blue-400": selected && selected.id === user.id,
            "text-blue-100": selected && selected.id === user.id,
          })}
          onClick={() => history.push(routes.UserViewRoute.getPath(user.id))}
        >
          <div className="flex flex-row">
            <div className="flex-1 font-bold">{user.username}</div>
            {isUserLocked(user) && <Icon icon="lock" />}
          </div>
          <div>{user.email}</div>
        </div>
      ))}
    </div>
  );
};
