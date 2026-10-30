import axios from "axios";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  access: string;
  refresh?: string;
}

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
}); 

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem("access");

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("token/refresh/")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refresh = localStorage.getItem("refresh");

          if (!refresh) {
            throw new Error("Refresh token not found");
          }

          const response = await refreshApi.post<RefreshResponse>(
            "token/refresh/",
            { refresh }
          );

          const newAccess = response.data.access;

          if (!newAccess) {
            throw new Error("Access token not returned");
          }

          localStorage.setItem("access", newAccess);

          if (response.data.refresh) {
            localStorage.setItem("refresh", response.data.refresh);
          }

          return newAccess;
        })();
      }

      const newAccess = await refreshPromise;

      originalRequest.headers.Authorization = `Bearer ${newAccess}`;

      return api(originalRequest);

    } catch (refreshError) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("name");

      window.location.href = "/login";

      return Promise.reject(refreshError);

    } finally {
      refreshPromise = null;
    }
  }
);

export default api;
