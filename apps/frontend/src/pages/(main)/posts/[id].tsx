import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { formatDistanceToNow } from "date-fns";

import api from "@/lib/axios";
import type { Post } from "@/lib/types";

export const Loader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params as { id: string };
  try {
    const post = await api.get<Post>(`/posts/${id}`);
    return { post: post.data };
  } catch {
    return { error: "Invalid post" };
  }
};

export default function Page() {
  const { post, error } = useLoaderData<typeof Loader>();

  if (error)
    return (
      <p className="mt-8 text-center font-semibold text-red-600 dark:text-red-400">
        {error}
      </p>
    );

  if (!post)
    return (
      <p className="mt-8 text-center text-gray-700 dark:text-gray-300">
        Can't load post info.
      </p>
    );

  return (
    <div className="mx-auto mt-8 max-w-2xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-900">
      <h1 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Post Details
      </h1>
      <p className="mb-6 whitespace-pre-wrap text-gray-800 dark:text-gray-200">
        {post.content}
      </p>
      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {formatDistanceToNow(new Date(post.created), { addSuffix: true })}
      </div>
      <strong>{post.user?.username}</strong>
    </div>
  );
}
