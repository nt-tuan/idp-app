import { User } from "oidc-client";
import { api } from "./api";
import { ChangePasswordModel, IUser } from "../models/user";
const base = process.env.REACT_APP_API_URL;
const get = async (oidcUser: User) => {
  return await api.get<IUser>(`${base}/api/me`, oidcUser);
};

const update = async (oidcUser: User, profile: IUser) => {
  return await api.put(
    `${base}/api/me/update`,
    JSON.stringify(profile),
    oidcUser
  );
};

const changePassword = async (oidcUser: User, body: ChangePasswordModel) => {
  await api.post(
    `${base}/api/me/changepassword`,
    JSON.stringify(body),
    oidcUser
  );
};

export const meAPI = { get, update, changePassword };
