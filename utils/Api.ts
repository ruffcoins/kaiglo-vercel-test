import Auth from "@/utils/auth";
import axios, { InternalAxiosRequestConfig } from "axios";

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

Api.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    if (Auth.isAuthenticated()) {
      config.headers["Authorization"] = `Bearer ${Auth.getToken()}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

Api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default Api;
