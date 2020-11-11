import { User } from "oidc-client";
export interface RequestError {
  messages: string[];
}

const err = (message: string) => {
  return { messages: [message] } as RequestError;
};
const ErrEmptyRespose = err("empty-response");
const request = async <T>(
  url: string,
  method: string,
  body?: BodyInit,
  user?: User
) => {
  const headers = {
    "Content-Type": "application/json",
  };
  const requestInit = user
    ? {
        url,
        headers: { ...headers, Authorization: `Bearer ${user.access_token}` },
        body,
        method,
      }
    : { headers, method, body };
  const response = await fetch(url, requestInit);
  const text = await response.text();
  if (response.ok) {
    if (text == null || text === "") return {} as T;
    return JSON.parse(text) as T;
  }
  try {
    const errJson = JSON.parse(text) as RequestError;
    return Promise.reject(errJson);
  } catch {
    return Promise.reject(err(response.statusText));
  }
};
const get = async <T>(url: string, user?: User) =>
  request<T>(url, "GET", undefined, user);
const post = async <T>(url: string, body?: string, user?: User) =>
  request<T>(url, "POST", body, user);
const put = async <T>(url: string, body?: string, user?: User) =>
  request<T>(url, "PUT", body, user);
export const api = {
  request,
  get,
  post,
  put,
  err,
  ErrEmptyRespose,
};
