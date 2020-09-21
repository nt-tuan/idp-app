import { IUserProps } from "./userModel";
import { api } from "./api";
import queryString from "query-string";
import { stringify } from "querystring";

const base = process.env.REACT_APP_API_URL;
const list = async (
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
  const users = await api.get<IUserProps[]>(
    queryString.stringifyUrl({ url, query })
  );
  if (users === undefined) return [] as IUserProps[];
  return users;
};
const get = async (id: string) => {
  const user = await api.get<IUserProps>(`${base}/api/admin/user/${id}`);
  if (user === undefined) return Promise.reject(api.ErrEmptyRespose);
  return user;
};
const grantRole = async (id: string, role: string) => {
  const url = `${base}/api/admin/user/${id}/role/${role}`;
  await api.put<void>(url);
  return;
};
const revokeRole = async (id: string, role: string) => {
  const url = `${base}/api/admin/user/${id}/role/${role}`;
  await api.request(url, "DELETE");
  return;
};
const lock = async (id: string) => {
  const url = `${base}/api/admin/user/${id}/lock`;
  await api.post(url);
  return;
};
const unlock = async (id: string) => {
  const url = `${base}/api/admin/user/${id}/unlock`;
  await api.post(url);
  return;
};

export const user = { get, list, grantRole, revokeRole, lock, unlock };
