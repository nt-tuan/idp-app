import { RequestError } from "./api";

const base = process.env.REACT_APP_IMAGE_API_URL;

export interface ImageInfo {
  fullname: string;
  id: number;
  tags: string[];
  by?: string;
  at?: string;
  width: number;
  height: number;
  diskSize: number;
}
export async function request<T>(
  method: string,
  path: string,
  body?: BodyInit,
  token?: string,
  extraHeaders?: { [key: string]: string }
): Promise<T> {
  const url = base + path;
  const baseHeaders = extraHeaders
    ? extraHeaders
    : {
        "Content-Type": "application/json",
      };
  const headers = token
    ? { ...baseHeaders, Authorization: `Bearer ${token}` }
    : baseHeaders;
  const response = await fetch(url, { method, headers, body });
  const text = await response.text();
  if (response.ok) {
    if (text == null || text === "") return {} as T;
    return JSON.parse(text);
  }
  if (text == null || text === "")
    return Promise.reject({ Err: response.statusText });
  return Promise.reject(JSON.parse(text) as RequestError);
}

export const getImageLink = (image: ImageInfo) => {
  return `${base}/images/static/${image.fullname}`;
};

export const upload = async (name: string, data: File, token: string) => {
  const formData = new FormData();
  formData.append("file", data);
  formData.append("name", name);
  const image = await request<ImageInfo>(
    "PUT",
    `/admin/image`,
    formData,
    token,
    {}
  );
  if (image === undefined) {
    return Promise.reject("invalid-data");
  }
  image.tags = [];
  return image;
};

export const addTag = async (id: number, tag: string, token: string) => {
  return request("PUT", `/admin/image/${id}/tag/${tag}`, undefined, token);
};
