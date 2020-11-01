import { User } from "oidc-client";
import { IRole } from "resources/models/role";
import { api } from "./api";
const base = process.env.REACT_APP_API_URL;
const create = async (user: User, role: IRole) =>
  await api.put<IRole>(`${base}/api/admin/roles`, JSON.stringify(role), user);

export const roleAPI = {
  create,
};
