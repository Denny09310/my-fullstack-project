import type { ActionFunctionArgs } from "react-router";
import { Form, useActionData } from "react-router";

import api from "@/lib/axios";
import { redirect } from "@/router";

export async function Action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const body = Object.fromEntries(form.entries());

  try {
    await api.post("/auth/register", body);
    return redirect("/login");
  } catch {
    return { error: "Registration Failed" };
  }
}

export default function Page() {
  const data = useActionData<typeof Action>();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
        <h1 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          Register
        </h1>
        {data?.error && (
          <p className="text-center text-sm text-red-500">{data.error}</p>
        )}
        <Form method="post" className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            required
            className="w-full rounded-md bg-gray-100 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:text-white"
          />
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
            Register
          </button>
        </Form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
