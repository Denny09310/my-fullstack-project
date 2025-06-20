import { Outlet } from "react-router";

import { useAuth } from "@/lib/auth-context";
import { Navigate } from "@/router";

export default function Layout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}
