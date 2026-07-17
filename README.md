# Meridian ABM Platform

Enterprise-grade Account-Based Marketing (ABM) platform — an executive dashboard, account
intelligence, pipeline, revenue, campaigns, intent data, content, events, analytics, and
AI-driven insights, built as a production-quality Next.js SaaS UI in the style of 6sense,
Demandbase, HubSpot, and Salesforce.

The entire app runs on deterministic, seeded mock data in `/data` — no backend is required to
explore it. Prisma and Supabase are wired up as the integration point for swapping that mock
data out for a real Postgres database.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with an OKLCH design-token theme (light/dark)
- Hand-rolled **shadcn/ui**-style primitives on Radix UI (the shadcn registry is
  network-blocked in some environments, so components are vendored directly in
  `components/ui`)
- **Recharts** for data visualization, **TanStack Table** for data grids
- **TanStack Query** and **Zustand** for server/client state
- **React Hook Form** + **Zod** for validated forms
- **Prisma ORM** (v7, driver-adapter based) targeting **PostgreSQL** — schema-only,
  ready to point at **Supabase**
- **Framer Motion**-ready animation primitives, **Lucide** icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
/app          Next.js App Router routes (one folder per page)
/components
  /ui         Base primitives (button, card, table, dialog, ...)
  /layout     App shell: sidebar, top bar, breadcrumb, command palette
  /shared     Cross-page building blocks: KPI cards, timeline, data table, badges
  /charts     Recharts wrappers: sparkline, funnel, donut, radar, gauge, heatmap
  /features   Page-specific components, grouped by domain (accounts, pipeline, ...)
/data         Seeded mock data + generators (accounts, stakeholders, pipeline, ...)
/types        Shared TypeScript domain types
/hooks        Zustand UI store, chart theme, mounted-state hooks
/lib          Utilities, chart color system, Prisma/Supabase clients
/prisma       schema.prisma — the target data model for real persistence
```

## Data layer

Every page reads from `/data`, which builds realistic datasets with a seeded PRNG
(`data/seed.ts`) so the output is **identical between server and client renders** — this
matters because Next.js SSRs the initial HTML and then re-executes the same modules in the
browser during hydration; a naive `Math.random()`-based generator (or `Array.sort` used as a
shuffle, whose comparator call count is engine-dependent) will silently desync the two and
throw hydration errors.

## Connecting a real backend

1. Copy `.env.example` to `.env` and fill in `DATABASE_URL` (a Supabase Postgres connection
   string) plus the Supabase project keys.
2. `npm run db:push` to sync `prisma/schema.prisma` to your database (or `db:migrate` for a
   tracked migration).
3. Swap the `/data` imports in each page for calls through `lib/prisma.ts` /
   `lib/supabase/server.ts`.

`middleware.ts` refreshes the Supabase session on every request but no-ops until the Supabase
env vars are set, so the app runs fully mock-data-driven out of the box.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:push` | Push the Prisma schema to the database |
| `npm run db:studio` | Open Prisma Studio |

## Deploying

Vercel-ready out of the box — `next build` produces static pages for every route (including
per-account detail pages via `generateStaticParams`). Add the environment variables from
`.env.example` in your Vercel project settings once a real database is connected.
