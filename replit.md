# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.
This project is the AquaDeco (아쿠아데코) business website — a Korean interior decorating and aquarium installation company's professional homepage with public-facing pages and an admin management panel.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/aquadeco)
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Session**: express-session (admin auth)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── aquadeco/         # React + Vite frontend (AquaDeco website)
│   └── api-server/       # Express API server
├── lib/
│   ├── api-spec/         # OpenAPI spec + Orval codegen config
│   ├── api-client-react/ # Generated React Query hooks
│   ├── api-zod/          # Generated Zod schemas from OpenAPI
│   └── db/               # Drizzle ORM schema + DB connection
│       └── schema/
│           ├── inquiries.ts  # Customer inquiries table
│           └── content.ts    # Site content management table
├── scripts/
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## AquaDeco Website Features

### Public Pages
- `/` — Homepage with hero, services, portfolio gallery, CTA sections
- `/services` — Detailed services page
- `/portfolio` — Portfolio/gallery of projects
- `/inquiry` — 견적문의 (Quote inquiry form)
- `/contact` — Contact information

### Admin Pages (password protected)
- `/admin/login` — Admin login (password: `aquadeco2024!`)
- `/admin` — Dashboard with inquiry statistics
- `/admin/inquiries` — Inquiry management (view, filter, update status)
- `/admin/content` — Site content editor (edit text visible on homepage)

### Special Features
- **Floating contact buttons**: Naver Talk Talk (green), KakaoTalk channel (yellow), Phone (blue) — always visible
- **Admin bar**: When logged in, shows a subtle admin mode indicator at the top
- **Inline content editing**: Admin can click to edit text fields on the content page

## Admin Credentials

- **Password**: `aquadeco2024!` (change via `ADMIN_PASSWORD` environment variable)

## API Routes

- `GET /api/healthz` — Health check
- `POST /api/auth/login` — Admin login
- `POST /api/auth/logout` — Admin logout
- `GET /api/auth/me` — Check admin session
- `GET /api/content` — Get all site content (public)
- `PUT /api/content/:key` — Update content item (admin only)
- `POST /api/inquiries` — Submit inquiry (public)
- `GET /api/inquiries` — List inquiries (admin only)
- `GET /api/inquiries/stats` — Inquiry statistics (admin only)
- `GET /api/inquiries/:id` — Get single inquiry (admin only)
- `PATCH /api/inquiries/:id` — Update inquiry status (admin only)

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (auto-provisioned)
- `SESSION_SECRET` — Session secret for admin auth (set in secrets)
- `ADMIN_PASSWORD` — Admin login password (default: `aquadeco2024!`)

## Running Development

- Frontend: `pnpm --filter @workspace/aquadeco run dev`
- API Server: `pnpm --filter @workspace/api-server run dev`
- DB Schema push: `pnpm --filter @workspace/db run push`
- Codegen: `pnpm --filter @workspace/api-spec run codegen`
