import Cookies from "universal-cookie";
export interface RequestError {
  message: string;
}

const err = (message: string) => {
  return { message } as RequestError;
};
const ErrEmptyRespose = err("empty-response");

const request = async <T>(url: string, method: string, body?: string) => {
  const cookies = new Cookies();
  const id_token = cookies.get("id_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${id_token}`,
  };
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
