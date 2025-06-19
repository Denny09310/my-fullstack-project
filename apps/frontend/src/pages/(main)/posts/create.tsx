import { Form, useActionData, type ActionFunctionArgs } from "react-router";

import { redirect } from "@/router";
import api from "@/lib/axios";

export const Action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const content = form.get("content");

  if (!content || typeof content !== "string" || content.trim() === "") {
    return { error: "Post content is required" };
  }
  try {
    await api.post("/posts", JSON.stringify({ content }));
    return redirect("/");
  } catch {
    return { error: "Failed to create post" };
  }
};

export default function PostCreatePage() {
  const data = useActionData<{ error?: string }>();

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Create Post
      </h1>

      {data?.error && (
        <p className="mb-4 font-semibold text-red-600 dark:text-red-400">
          {data.error}
        </p>
      )}

      <Form method="post" className="flex flex-col gap-4">
        <textarea
          name="content"
          placeholder="Write your post here..."
          rows={5}
          className="rounded border p-3 focus:ring-2 focus:ring-blue-600 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
          required
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
