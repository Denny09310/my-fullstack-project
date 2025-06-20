import { Outlet } from "react-router";

import { AuthProvider } from "@/lib/auth-context";

export default function App() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
