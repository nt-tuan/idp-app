import { User } from "oidc-client";
import { api } from "./api";
import { ChangePasswordModel, IUser, UserSignInLog } from "../models/user";
import { Consent } from "../models/consent";
import { IRole } from "resources/models/role";
const base = process.env.REACT_APP_API_URL;
const get = async (oidcUser: User) => {
  return await api.get<IUser>(`${base}/api/me`, oidcUser);
};
const getAllRoles = async (oidcUser: User) =>
  await api.get<IRole[]>(`${base}/api/admin/roles`, oidcUser);
const update = async (oidcUser: User, profile: IUser) => {
  return await api.put<IUser>(
    `${base}/api/me`,
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
const getAccessLogin = async (oidcUser: User) =>
  api.get<UserSignInLog[]>(`${base}/api/me/logs`, oidcUser);
const getConsentSession = async (oidcUser: User) =>
  api.get<Consent.ConsentSession[]>(`${base}/api/me/consentSessions`, oidcUser);
const revokeSession = async (clientId: string, oidcUser: User) =>
  await api.delete(
    `${base}/api/me/revokeConsentSession?client=${clientId}`,
    undefined,
    oidcUser
  );
export const meAPI = {
  get,
  getAllRoles,
  update,
  changePassword,
  getAccessLogin,
  getConsentSession,
  revokeSession,
};
