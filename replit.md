# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.
This project is the **휴편백** business website — a Korean 히노끼욕조 (Japanese cypress/hinoki bath) manufacturer's professional homepage with public-facing pages, shopping functionality, and an admin management panel.

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
- **Cart**: React Context + localStorage

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── aquadeco/         # React + Vite frontend (휴편백 website)
│   └── api-server/       # Express API server
├── lib/
│   ├── api-spec/         # OpenAPI spec + Orval codegen config
│   ├── api-client-react/ # Generated React Query hooks
│   ├── api-zod/          # Generated Zod schemas from OpenAPI
│   └── db/               # Drizzle ORM schema + DB connection
│       └── schema/
│           ├── inquiries.ts  # Customer inquiries table
│           ├── content.ts    # Site content management table
│           ├── products.ts   # Products table (히노끼욕조, 악세사리)
│           └── orders.ts     # Orders table (cart checkout orders)
├── scripts/
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## 휴편백 Website Features

### Navigation (Dropdown)
- **홈** — Homepage
- **회사소개** ↓ — 경영이념, 주요실적, 찾아오시는 길
- **사업소개** ↓ — 히노끼란, 제작방식(FRP방수/짜맞춤), 관리방법, 원산지증명
- **쇼핑(구매하기)** ↓ — 히노끼욕조(반신/전신/주문제작/할인), 악세사리(데크수전/목함수전/외부계단/월풀)
- **현장 시공사례** ↓ — 유절, 무절, 무절 마사메, 양산형, 현장별
- **시공일정** — Schedule
- **고객센터** ↓ — 고객센터, 견적문의, 공지사항

### Public Pages
- `/` — Homepage with hero, products, company intro, process, CTA
- `/about/:section` — Company intro (philosophy, achievements, location)
- `/business/:section` — Business intro (hinoki, production, care, certificate)
- `/shop` — All products listing
- `/shop/:category` — Category filter (bath, accessory)
- `/shop/:category/:sub` — Sub-category filter
- `/shop/product/:id` — Product detail with add to cart
- `/shop/cart` — Cart with order form (submits to orders table)
- `/portfolio` — All case studies with CDN images
- `/portfolio/:category` — Filtered by category (ujul/mujul/masame/yangsan/location)
- `/schedule` — Construction schedule info
- `/contact` — Customer service (fixed KakaoTalk URL: pf.kakao.com/_XcSHxj)
- `/inquiry` — Quote inquiry form
- `/notice` — Announcements board

### Admin Pages (password protected)
- `/admin/login` — Admin login (password: see ADMIN_PASSWORD env var)
- `/admin` — Dashboard with inquiry statistics
- `/admin/inquiries` — Inquiry management (view, filter, update status)
- `/admin/content` — Site content editor (edit text visible on homepage)

### Special Features
- **Company logo**: CDN image at top of navbar
- **Floating contact buttons**: Naver Talk Talk (green), KakaoTalk channel (yellow, correct URL), Phone (blue)
- **Cart system**: React Context + localStorage, cart count badge on navbar
- **Admin bar**: When logged in, shows a subtle admin mode indicator at the top
- **Portfolio**: 20 entries with real CDN images from original imweb site

## Products (DB seeded)

| Name | Category | Price |
|------|----------|-------|
| 히노끼 반신욕조 | bath/half | 1,320,000원~ |
| 히노끼 전신욕조 | bath/full | 1,650,000원~ |
| 주문제작형 욕조 | bath/custom | 가격 문의 |
| 할인 제품 | bath/sale | 할인가 문의 |
| 데크수전 | accessory/deck | 가격 문의 |
| 목함수전 | accessory/box | 가격 문의 |
| 외부계단 | accessory/stairs | 가격 문의 |
| 월풀 시스템 | accessory/whirlpool | 가격 문의 |

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
- `GET /api/products` — List products (public, supports ?category=&sub= filters)
- `GET /api/products/:id` — Get single product (public)
- `POST /api/products/orders` — Submit order/inquiry (public)
- `GET /api/products/orders/all` — List orders (admin only)
- `PATCH /api/products/orders/:id/status` — Update order status (admin only)

## Environment Variables

- `DATABASE_URL` — PostgreSQL connection string (auto-provisioned)
- `SESSION_SECRET` — Session secret for admin auth (set in secrets)
- `ADMIN_PASSWORD` — Admin login password (default: `aquadeco2024!`)

## Running Development

- Frontend: `pnpm --filter @workspace/aquadeco run dev`
- API Server: `pnpm --filter @workspace/api-server run dev`
- DB Schema push: `pnpm --filter @workspace/db run push`
- Codegen: `pnpm --filter @workspace/api-spec run codegen`

## Important URLs

- **KakaoTalk Channel**: https://pf.kakao.com/_XcSHxj
- **Company Logo**: https://cdn.imweb.me/thumbnail/20250512/ce3e25e3dd553.png
