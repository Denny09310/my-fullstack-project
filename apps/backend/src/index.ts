import express from "express";

import auth from "@/routes/auth";
import posts from "@/routes/posts";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/auth", auth);
app.use("/posts", posts);

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
