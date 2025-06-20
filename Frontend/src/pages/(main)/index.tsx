import { useLoaderData } from "react-router";

import PostItem from "@/components/post-item";
import RoundedAvatar from "@/components/user-avatar";
import { Link } from "@/router";
import type { Prisma } from "@my-fullstack-app/database";

export const Loader = async () => {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Failed to load posts");

  const posts = (await res.json()) as Prisma.PostGetPayload<{
    include: { user: true };
  }>[];

  return { posts };
};

export default function PostsPage() {
  const { posts } = useLoaderData<typeof Loader>();

  return (
    <div className="mx-auto max-w-xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Posts Feed
        </h1>
        <RoundedAvatar />
      </div>

      <Link
        to="/posts/create"
        className="mb-6 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Create New Post
      </Link>

      {posts.length === 0 && (
        <p className="text-gray-700 dark:text-gray-300">No posts yet.</p>
      )}

      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
