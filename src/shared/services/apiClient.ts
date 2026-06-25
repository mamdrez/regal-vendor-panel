import axios, { type AxiosInstance } from "axios";

/**
 * Shared Axios instance for the whole app.
 *
 * No real backend exists in Phase 1, so this client is not used by the mock
 * services yet. It is defined here so feature services can be migrated from
 * mock implementations to real HTTP calls without changing their call sites.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("regal_vendor_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
