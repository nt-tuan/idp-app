import {
  GetConsentResponse,
  PostConsentResponse,
} from "resources/ConsentResponse";
import api from "./Api";
const baseURL = process.env.REACT_APP_AUTH_URL;
const get = async <GetConsentResponse>(challenge: string) => {
  return await api.get<GetConsentResponse>(
    `${baseURL}/consent?consent_challenge=${challenge}`
  );
};

const post = async <PostConsentResponse>(
  login_challenge: string,
  username: string,
  password: string
) => {
  const reqBody = { login_challenge, username, password };
  return await api.post<PostConsentResponse>(
    `${baseURL}/consent`,
    JSON.stringify(reqBody)
  );
};

const LoginAPI = { get, post };
export default LoginAPI;
