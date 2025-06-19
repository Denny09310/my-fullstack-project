import { useNavigate } from "react-router";

import { useAuth } from "@/context/AuthContext";

export default function RoundedAvatar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user context and any stored token (e.g., localStorage or Capacitor Preferences)
    setUser(null);
    localStorage.removeItem("token"); // or your token storage key

    // Redirect to login or home
    navigate("/login");
  };

  // Fallback: generate initials from username
  const initials = user?.username
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <button
      onClick={handleLogout}
      aria-label="Logout"
      title="Logout"
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white transition select-none hover:bg-blue-700"
    >
      <span className="font-semibold">{initials}</span>
    </button>
  );
}
