import axios from "axios";
import type {ApiError} from "../models/api-error.ts";

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) {
  throw new Error("Missing VITE_API_BASE_URL in environment variables");
}

export const axiosClient = axios.create({
  baseURL, // change this
  headers: {
    "Content-Type": "application/json",
  },
});


// Global response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    // Normalize Axios errors
    const apiError: ApiError = {
      message: "Unknown API error",
    };

    if (axios.isAxiosError(error)) {
      apiError.message = error.response?.data?.message || error.message;
      apiError.status = error.response?.status;
      apiError.data = error.response?.data;
    } else if (error instanceof Error) {
      apiError.message = error.message;
    }

    // Reject with normalized error
    return Promise.reject(apiError);
  }
);