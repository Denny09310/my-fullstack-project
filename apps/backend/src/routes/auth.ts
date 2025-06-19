import { prisma } from "@my-fullstack-app/database";
import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";

import { AuthorizedRequest, authorized } from "@/middlewares/auth-middleware";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret";

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body as {
    email: string;
    username: string;
    password: string;
  };

  if (!email || !password || !username) throw new Error("Missing fields");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, username, password: hashed },
  });

  res
    .status(201)
    .json({ id: user.id, email: user.email, username: user.username });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

  res.json({
    token,
    user: { id: user.id, email: user.email, username: user.username },
  });
});

router.get("/me", authorized, (req, res) => {
  const { id, email, username } = (req as AuthorizedRequest).user;
  res.json({ id, email, username });
});

export default router;
