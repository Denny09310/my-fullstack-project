import { Outlet } from "react-router";

import { AuthenticationProvider } from "@/lib/authentication";

export default function App() {
  return (
    <AuthenticationProvider>
      <Outlet />
    </AuthenticationProvider>
  );
}
