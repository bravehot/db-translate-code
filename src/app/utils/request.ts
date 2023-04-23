import { InteUserInfo } from "./../@types/index";
import { message } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInterface = axios.create({
  baseURL: "http://localhost:8848",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInterface.interceptors.request.use((config) => {
  const token = localStorage.getItem("_db_token");
  if (token) {
    const { headers } = config;
    headers!.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInterface.interceptors.response.use(
  async (response: AxiosResponse<API.BaseResponseType<any>>) => {
    return response;
  },
  ({ response }) => {
    const { data } = response;
    message.error(data.message ?? "Internal Server Error");
  }
);

export const request = async <T>(
  config: AxiosRequestConfig
): Promise<API.BaseResponseType<T>> => {
  try {
    const { data } = await axiosInterface(config);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserInfo = <T>() => {
  return request<T>({
    url: "/auth/userInfo",
    method: "GET",
  });
};

export const githubLogin = <T>(code: string) => {
  return request<T>({
    url: "/auth/github",
    method: "GET",
    params: { code },
  });
};
