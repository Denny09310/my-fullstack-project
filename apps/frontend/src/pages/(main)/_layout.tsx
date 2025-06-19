import { Outlet } from "react-router";

import { useAuth } from "@/context/AuthContext";
import { Navigate } from "@/router";

export default function Layout() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}
