import { http, setAuthToken, clearAuthToken } from "./http";

export const AuthAPI = {
  async signup({ email, username, password }) {
    const { data } = await http.post("/api/auth/signup", { email, username, password });
    if (data.token) setAuthToken(data.token);
    return data; // { message, token }
  },

  async login({ email, password }) {
    const { data } = await http.post("/api/auth/login", { email, password });
    if (data.token) setAuthToken(data.token);
    return data; // { message, token }
  },

  logout() {
    clearAuthToken();
  },
};
