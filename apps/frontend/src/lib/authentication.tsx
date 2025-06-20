import type { User } from "@my-fullstack-app/database";
import { createContext, useContext, useEffect, useState } from "react";

import api from "@/lib/axios";
import { Preferences } from "@capacitor/preferences";

const AuthenticationContext = createContext<{
  user: User | null;
  login: (credentials: Pick<User, "email" | "password">) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}>({
  user: null,
  login: async () => {},
  logout: async () => {},
  refresh: async () => {},
});

export function AuthenticationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    refresh();
  }, []);

  async function refresh() {
    try {
      const res = await api.get<User>("/auth/me");
      setUser(res.data);
    } catch {
      setUser(null);
    }
  }
  async function logout() {
    await Preferences.remove({ key: "auth_token" });
    await refresh();
  }

  async function login(credentials: Pick<User, "email" | "password">) {
    const res = await api.post<{ token: string }>("/auth/login", credentials);
    const token = res.data.token;
    if (!token) throw new Error("No token received from login");
    await Preferences.set({ key: "auth_token", value: token });
    await refresh();
  }

  if (user === undefined) return <p>Authorizing...</p>;

  return (
    <AuthenticationContext.Provider value={{ user, login, logout, refresh }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      "useAuthentication must be used within an AuthenticationProvider",
    );
  }
  return context;
};
