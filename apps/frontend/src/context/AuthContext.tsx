import React, { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@my-fullstack-app/database";

import api from "@/lib/axios";

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>();

  useEffect(() => {
    const restore = async () => {
      try {
        const res = await api.get<User>("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    restore();
  }, []);

  if (user === undefined) return <p>Authorizing...</p>;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
