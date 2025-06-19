import { prisma } from "@my-fullstack-app/database";
import express from "express";

import { authorized, AuthorizedRequest } from "@/middlewares/auth-middleware";

const router = express.Router();

router.get("/", async (_req, res) => {
  const posts = await prisma.post.findMany({
    include: { user: true },
    orderBy: { created: "desc" },
  });
  res.json(posts);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const posts = await prisma.post.findFirst({
    include: { user: true },
    where: { id: id },
  });
  res.json(posts);
});

router.post("/", authorized, async (req, res) => {
  const { content } = req.body;
  const user = (req as AuthorizedRequest).user;

  if (!content || !user) throw new Error("Missing content or userid");

  const post = await prisma.post.create({
    data: { content, userid: user.id },
  });
  res.json(post);
});

router.put("/:id", async (req, res) => {
  const { content } = req.body;
  const post = await prisma.post.update({
    where: { id: req.params.id },
    data: {
      content,
      updated: new Date(),
    },
  });
  res.json(post);
});

export default router;
