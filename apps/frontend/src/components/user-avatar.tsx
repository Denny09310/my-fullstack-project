import { useAuthentication } from "@/lib/authentication";

export default function RoundedAvatar() {
  const { user, logout } = useAuthentication();

  const initials = user?.username
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .slice(0, 2)
    .join("");

  return (
    <button
      onClick={logout}
      aria-label="Logout"
      title="Logout"
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white transition select-none hover:bg-blue-700"
    >
      <span className="font-semibold">{initials}</span>
    </button>
  );
}
