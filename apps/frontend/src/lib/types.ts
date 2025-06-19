import type {
  Post as PostPrimitive,
  User as UserPrimitive,
} from "@my-fullstack-app/database";

export type User = UserPrimitive & {
  posts: Post[] | undefined;
};

export type Post = PostPrimitive & {
  user: User | undefined;
};
