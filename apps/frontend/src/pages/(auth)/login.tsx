import type { User } from "@my-fullstack-app/database";
import { useState } from "react";
import { Form } from "react-router";

import { useAuthentication } from "@/lib/authentication";
import { Link, useNavigate } from "@/router";

export default function Page() {
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuthentication();
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const form = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(form.entries()) as Pick<
      User,
      "email" | "password"
    >;

    await login(credentials)
      .then(() => navigate("/", { replace: true }))
      .catch(() => setError("Invalid email or password. Please try again."));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
        <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          Login
        </h1>
        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        <Form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
          >
            Login
          </button>
        </Form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
