import { Outlet } from "react-router";

import { useAuthentication } from "@/lib/authentication";
import { Navigate } from "@/router";

export default function Layout() {
  const { user } = useAuthentication();
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}
