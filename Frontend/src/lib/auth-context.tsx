import type { User } from "@my-fullstack-app/database";
import { createContext, useContext, useEffect, useState } from "react";

import api from "@/lib/axios";
import { Preferences } from "@capacitor/preferences";

const AUTH_EVENT_NAME = "authchanged";

const AuthContext = createContext<{
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
  refresh: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>();

  async function refresh() {
    try {
      const res = await api.get<User>("/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    window.addEventListener(AUTH_EVENT_NAME, refresh);
    refresh();
    return () => window.removeEventListener(AUTH_EVENT_NAME, refresh);
  }, []);

  if (user === undefined) return <p>Authorizing...</p>;

  return (
    <AuthContext.Provider value={{ user, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export async function logout() {
  await Preferences.remove({ key: "auth_token" });
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export async function login(token: string) {
  await Preferences.set({ key: "auth_token", value: token });
  window.dispatchEvent(new Event(AUTH_EVENT_NAME));
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
