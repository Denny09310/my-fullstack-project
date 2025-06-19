# 🔗 Fullstack Social Network App

This is a **simple fullstack social network** project built with:

- **React + Vite + React Router** (Frontend)
- **Capacitor** (Mobile/Web native shell)
- **TypeScript Monorepo** using `pnpm` workspaces
- **Prisma + SQLite** for database modeling
- **Shared Types** between frontend and backend for full type safety
- **JWT-based Authentication** (no cookies, compatible with Capacitor)
- **Framer Motion** for native-feeling transitions

---

## 📦 Monorepo Structure

The project is organized as a **monorepo** using [`pnpm`](https://pnpm.io/) and `packages/`:

```

apps/
frontend/        -> Vite + React + Capacitor
backend/         -> Express (or ASP.NET Core on another branch)
packages/
database/        -> Prisma schema + generated client
shared/          -> Shared types (Post, User, etc.)

```

> The project uses `@my-fullstack-app/*` as internal package aliases via `package.json` and TypeScript references.

---

## 🌿 Branching Strategy

This repository uses branches to support different backend technologies while keeping the frontend consistent:

- [`main`](https://github.com/your-repo/tree/main) – **📘 Documentation-only branch**  
  Contains only this `README.md`, to explain the project and structure.
- [`express`](https://github.com/your-repo/tree/express) – **Node.js + Express** backend  
  Full implementation of the backend using Express, Prisma, and JWT.

- [`aspnetcore`](https://github.com/your-repo/tree/aspnetcore) – **ASP.NET Core** backend  
  Implementation of the same API contract using C#, with shared type interoperability via OpenAPI or adapters.

---

## ✅ Features

- 🔐 JWT Authentication (no cookies, safe for Capacitor)
- 🧠 Shared Types between backend/frontend (`Post`, `User`, etc.)
- 💾 SQLite local database via Prisma
- ⚡ Vite for lightning-fast frontend DX
- 📱 Capacitor integration for mobile-native builds
- 🌀 Framer Motion for page transitions
- 🌗 Dark mode + TailwindCSS styling
- 🧩 Full control over routing with React Router loaders & actions

---

## 🛠️ Getting Started

From the appropriate branch (e.g. `express`):

```bash
# Install dependencies
pnpm install

# Run everything (frontend + backend)
pnpm dev
```

---

## 🗺 Roadmap

- [x] Register/Login with JWT
- [x] Create/Read Posts
- [x] Full dark/light styling with Tailwind
- [x] Transition-aware navigation with Framer Motion
- [ ] Comments & Likes
- [ ] Push notifications (Capacitor)
- [ ] iOS & Android builds

---

## 📄 License

MIT – free to use, modify, or fork for your own apps!

---

> Want to contribute or report issues? Feel free to open a discussion or PR in the respective branch.
