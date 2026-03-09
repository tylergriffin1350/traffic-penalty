import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";
import { AuthContextType } from "@/types/authContext";
import { getCookie } from "@/lib/cookies";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

// Create an instance for protected routes (requires authentication)
export const axiosAuth = axios.create({
  baseURL,
});

// Create an instance for public routes (no authentication required)
export const axiosPublic = axios.create({
  baseURL,
});

axiosAuth.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getCookie("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Function to set up interceptors
export const setupAxiosInterceptors = (
  refreshAuthToken: AuthContextType["refreshAuthToken"]
) => {
  axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await refreshAuthToken();
          // set the Authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${getCookie(
            "token"
          )}`;
          // retry the request with the new token
          return await axiosAuth(originalRequest);
        } catch (refreshError) {
          // If refresh token fails, sign out the user
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

export default axiosAuth;
