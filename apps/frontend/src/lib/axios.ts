import axios from "axios";
import { Preferences } from "@capacitor/preferences";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to each request
api.interceptors.request.use(async (config) => {
  const { value: token } = await Preferences.get({ key: "auth_token" });

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
