import { message } from "antd";
import axios from "axios";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { InteFieldConfig, InteGenerateCode } from "@/@types/code";
import type { InteField } from "@/@types/code";

const axiosInterface = axios.create({
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
    if (data.code === 401) {
      localStorage.removeItem("_db_token");
      localStorage.removeItem("_apiKey");
      message.error("Login has expired, please log in again");
    } else {
      message.error(data.message ?? "Internal Server Error");
    }
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

export const getFieLdList = (data: InteFieldConfig) => {
  return request<{ tscode: string; fieldList: string }>({
    url: "api/code/getCodeField",
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

export const getGenerateCode = (data: InteGenerateCode) => {
  return request<{ code: string }>({
    url: "/code/generate",
    method: "POST",
    data,
  });
};
