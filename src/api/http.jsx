import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://2e3f359c6e3a.ngrok-free.app";

let _token = null; // set from TokenContext / on login

export const setAuthToken = (t) => { _token = t; };
export const clearAuthToken = () => { _token = null; };

export const http = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// attach Authorization header if we have a token
http.interceptors.request.use((config) => {
  if (_token) config.headers.Authorization = `Bearer ${_token}`;
  return config;
});

// normalize errors: throw Error(message)
http.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Request failed";
    return Promise.reject(new Error(msg));
  }
);
