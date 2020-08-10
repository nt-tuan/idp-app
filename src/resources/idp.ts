import { api } from "./api";
import { RedirectResponse, LoginInformationResponse } from "./models";
const login = async (username: string, login_challenge: string) => {
  const body = JSON.stringify({ username, login_challenge });
  const res = await api.post<RedirectResponse>(
    `${process.env.REACT_APP_API_URL}/api/login`,
    body
  );
  if (res === undefined) return Promise.reject(api.ErrEmptyRespose);
  return res;
};

const getLogin = async (login_challenge: string) => {
  const res = await api.get<LoginInformationResponse>(
    `${process.env.REACT_APP_API_URL}/api/login?login_challenge=${login_challenge}`
  );
  if (res === undefined) return Promise.reject(api.ErrEmptyRespose);
  return res;
};

const acceptConsent = async (challenge: string) => {
  const res = await api.post<RedirectResponse>(
    `${process.env.REACT_APP_API_URL}/api/consent/accept?consent_challenge=${challenge}`
  );
  if (res === undefined) return Promise.reject(api.ErrEmptyRespose);
  return res;
};

const logout = async (logout_challenge: string) => {
  const res = await api.post<RedirectResponse>(
    `${process.env.REACT_APP_API_URL}/api/logout/accept?logout_challenge=${logout_challenge}`
  );
  if (res === undefined) return Promise.reject(api.ErrEmptyRespose);
  return res;
};

export const idp = { login, getLogin, acceptConsent, logout };
