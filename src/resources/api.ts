import Cookies from "universal-cookie";
import { constants } from "./constants";
import { auth } from "resources";
import { StoredToken } from "./authToken";
import ClientOAuth2 from "client-oauth2";
import { authInfo } from "./auth";
export interface RequestError {
  message: string;
}

const err = (message: string) => {
  return { message } as RequestError;
};
const ErrEmptyRespose = err("empty-response");

const request = async <T>(url: string, method: string, body?: string) => {
  var headers = {
    "Content-Type": "application/json",
  };
  const token = authInfo.token;
  if (token !== undefined) {
    const signed = token.sign({ url, headers, method });
    var headers = signed.headers;
  }
  const response = await fetch(url, { headers, method, body });
  const text = await response.text();
  if (response.ok) {
    if (text == null || text == "") return undefined;
    return JSON.parse(text) as T;
  }
  try {
    const errJson = JSON.parse(text) as RequestError;
    return Promise.reject(errJson);
  } catch {
    return Promise.reject(err(response.statusText));
  }
};

const get = async <T>(url: string) => request<T>(url, "GET");
const post = async <T>(url: string, body?: string) =>
  request<T>(url, "POST", body);
const put = async <T>(url: string, body?: string) =>
  request<T>(url, "PUT", body);
export const api = {
  request,
  get,
  post,
  put,
  err,
  ErrEmptyRespose,
};
