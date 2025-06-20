import type { Prisma } from "@my-fullstack-app/database";
import { formatDistanceToNow } from "date-fns";

import { Link } from "@/router";

type Props = {
  post: Prisma.PostGetPayload<{
    include: { user: true };
  }>;
};

export default function PostItem({ post }: Props) {
  return (
    <Link to="/posts/:id" params={{ id: post.id }}>
      <div className="mb-4 rounded border bg-white p-4 dark:bg-gray-800">
        <p className="whitespace-pre-wrap text-gray-900 dark:text-gray-100">
          {post.content}
        </p>
        <small className="text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(new Date(post.created), { addSuffix: true })}
        </small>
        <p>{post.user.username}</p>
      </div>
    </Link>
  );
}
