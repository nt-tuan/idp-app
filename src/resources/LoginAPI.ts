import { RequestLogin } from "resources/LoginResponse";
import api from "./Api";
const get = async (challenge: string) => {
  return await api.get<LoginResponse>(`/login?login_challenge=${challenge}`);
};

const post = async <LoginResponse>(
  login_challenge: string,
  username: string,
  password: string
) => {
  const reqBody = { login_challenge, username, password };
  return await api.post<LoginResponse>("/login", JSON.stringify(reqBody));
};

export const LoginAPI = { get, post };
