async function request<T>(
  method: string,
  path: string,
  body?: string
): Promise<T> {
  const headers = { "Content-Type": "application/json" };
  const response = await fetch(path, { method, headers, body });
  if (response.ok) return response.json();
  const error = await response.text();
  throw Error(error);
}

export default {
  get: <T>(path: string) => {
    return request<T>("GET", path);
  },
  post: <T>(path: string, body?: string) => {
    return request<T>("POST", path, body);
  },
  delete: <T>(path: string, body?: string) => {
    return request<T>("DELETE", path, body);
  },
};
