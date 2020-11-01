import { CreatedUser, IUser } from "../models/user";
import { api } from "./api";
import queryString from "query-string";
import { User } from "oidc-client";
import { IRole } from "../models/role";

const base = process.env.REACT_APP_API_URL;
const list = async (
  user: User,
  offset: number,
  limit: number,
  orderBy: string,
  orderDir: 1 | -1
) => {
  const url = `${base}/api/Admin/users`;
  const query = {
    offset: offset.toString(),
    limit: limit.toString(),
    orderBy,
    orderDir: orderDir.toString(),
  };
  const users = await api.get<IUser[]>(
    queryString.stringifyUrl({ url, query }),
    user
  );
  if (users === undefined) return [] as IUser[];
  return users;
};
const get = async (user: User, id: string) =>
  await api.get<IUser>(`${base}/api/admin/user/${id}`, user);
const create = async (user: User, createdUser: CreatedUser) =>
  await api.post<IUser>(
    `${base}/api/admin/user`,
    JSON.stringify(createdUser),
    user
  );
const update = async (user: User, id: string, updatedUser: IUser) =>
  await api.put<IUser>(
    `${base}/api/admin/user/${id}`,
    JSON.stringify(updatedUser),
    user
  );

const grantRole = async (user: User, id: string, role: string) =>
  await api.put<void>(
    `${base}/api/admin/user/${id}/role/${role}`,
    undefined,
    user
  );
const revokeRole = async (user: User, id: string, role: string) =>
  await api.request(
    `${base}/api/admin/user/${id}/role/${role}`,
    "DELETE",
    undefined,
    user
  );
const lock = async (user: User, id: string, lockEnd: Date) =>
  await api.post(
    `${base}/api/admin/user/${id}/lock`,
    JSON.stringify({ lockEnd }),
    user
  );

const unlock = async (user: User, id: string) =>
  await api.post(`${base}/api/admin/user/${id}/unlock`, undefined, user);

const getRoles = async (user: User) => {
  var roles = await api.get<IRole[]>(`${base}/api/admin/roles`, user);
  if (roles === undefined) return [] as IRole[];
  return roles;
};
const resetPassword = async (user: User, id: string) =>
  await api.post<{ password: string }>(
    `${base}/api/admin/user/${id}/reset`,
    undefined,
    user
  );

export const userAPI = {
  get,
  update,
  list,
  grantRole,
  revokeRole,
  lock,
  unlock,
  create,
  getRoles,
  resetPassword,
};
