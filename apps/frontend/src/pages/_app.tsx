import { Outlet } from "react-router";

import { AuthProvider } from "@/context/AuthContext";
import { useViewTransition } from "@/lib/use-view-transition";

export default function App() {
  useViewTransition();
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
