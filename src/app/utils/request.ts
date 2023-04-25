import { message } from "antd";
import axios from "axios";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { InteFieldConfig } from "../@types/code";
import { InteField } from "../@types/playground";

const axiosInterface = axios.create({
  baseURL: "http://localhost:8848",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInterface.interceptors.request.use((config) => {
  const token = localStorage.getItem("_db_token");
  const apiKey = localStorage.getItem("_apiKey");

  if (token) {
    const { headers } = config;
    headers!.Authorization = `Bearer ${token}`;
    headers!.ApiKey = apiKey;
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

export const getFieLdList = (data: InteFieldConfig) => {
  return request<{ tscode: string; fieldList: string }>({
    url: "/code/field",
    method: "POST",
    data,
  });
};

export const getTsCode = (data: InteField[]) => {
  return request<{ tscode: string }>({
    url: "/code/regenerate",
    method: "POST",
    data: {
      code: JSON.stringify(data),
    },
  });
};

export const getGenerateCode = (data: {
  code: string;
  framework: string;
  useTs: "Y" | "N";
  componetLib: string;
  component: string;
  mockData: "Y" | "N";
}) => {
  return request<{ code: string }>({
    url: "/code/generate",
    method: "POST",
    data,
  });
};
