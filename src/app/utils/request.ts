import axios, { AxiosRequestConfig } from "axios";

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

export const getUserInfo = <T>(code: string) => {
  return request<T>({
    url: "/auth/user",
    method: "GET",
    params: { code },
  });
};
