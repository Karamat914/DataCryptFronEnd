import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import cookieUtils from "@/utils/cookieUtils";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json, text/plain, */*",
  },
});

// const onRequest = (config: AxiosRequestConfig) => {
//   const token = cookieUtils.getCookie("token");
//   if (token) {
//     config!.headers!.Authorization = token ? `Bearer ${token}` : "";
//   }

//   return config;
// };

const onRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse) => {
  return response;
};

export default AxiosInstance;
