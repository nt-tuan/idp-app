import { UserProps } from "./userModel";
import { api } from "./api";

const base = process.env.REACT_APP_API_URL;
const list = async () => {
  const users = await api.get<UserProps[]>(`${base}/api/admin/users`);
  if (users === undefined) return [] as UserProps[];
  return users;
};
const get = async (id: string) => {
  const user = await api.get<UserProps[]>(`${base}/api/admin/user/${id}`);
  if (user === undefined) return Promise.reject(api.ErrEmptyRespose);
  return user;
};

export const user = { get, list };
