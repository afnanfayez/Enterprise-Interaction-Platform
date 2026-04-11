# Adel MVP — Enterprise Interaction Platform

## Overview

B2C/B2B/B2G e-commerce and order management platform targeting the Arab market.
Fully bilingual (Arabic RTL / English LTR) with JWT authentication, role-based access, and a multi-step order workflow.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Database** | PostgreSQL (Neon Serverless) |
| **ORM** | Drizzle ORM |
| **Auth** | JWT ([jose](https://github.com/panva/jose)) + httpOnly refresh cookies |
| **Validation** | Zod v4 |
| **Icons** | Lucide React |
| **Toasts** | Sonner |

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database ([Neon](https://neon.tech) recommended)

### Installation

```bash
npm install
cp .env.example .env
# Fill in your database URL and JWT secrets in .env
```

### Database Setup

```bash
npx drizzle-kit push    # Push schema to database
npm run db:seed          # Seed admin user (admin@adel.com / Admin123!)
```

### Development

```bash
npm run dev
```

### Build & Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── [locale]/               # Locale-scoped pages (ar / en)
│   ├── layout.tsx          # Root locale layout (providers, nav, toaster)
│   ├── page.tsx            # Landing / home
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── dashboard/          # User dashboard
│   ├── orders/             # Order list, detail & creation pages
│   │   ├── create/
│   │   └── [id]/
│   │       └── confirmation/
│   ├── profile/            # User profile
│   └── admin/              # Admin dashboard & order management
│       └── orders/
├── api/                    # API route handlers
│   ├── auth/               # login · register · logout · refresh
│   ├── orders/             # CRUD + status updates
│   ├── profile/            # Profile read/update
│   ├── countries/          # Country list
│   ├── cities/             # City list
│   └── locale/             # Locale switching
components/
├── auth/                   # AuthProvider, LoginForm, RegisterForm
├── orders/                 # CreateOrderForm, OrdersList, OrderDetail, OrderConfirmation
├── profile/                # ProfilePage & ProfileView
├── admin/                  # AdminDashboard, AdminOrderDetail, AdminSidebar
├── address-form/           # Country/city address selector
├── dashboard/              # Dashboard widgets
└── ui/                     # Reusable primitives (Button, Card, Input, Badge, etc.)
lib/
├── i18n.ts                 # AR/EN message dictionaries & locale helpers
├── validators.ts           # Zod schemas for forms & API input
├── api.ts                  # Client-side fetch helpers
└── server/                 # Server-only code
    ├── db.ts               # Drizzle + Neon connection
    ├── schema.ts           # Database schema
    ├── auth.ts             # JWT helpers (sign, verify, cookies)
    └── orders.ts           # Order query/mutation helpers
scripts/
└── seed-admin.ts           # Seeds the default admin user
```

## Features

- 🌐 **Bilingual AR/EN** with full RTL support
- 🔐 **JWT authentication** with role-based access (user / admin)
- 📦 **Multi-step order creation** with address, details, and review steps
- 📋 **Order tracking** with status timeline history
- 👤 **User profile management**
- 🛡️ **Admin dashboard** with order management and status updates
- 📱 **Responsive design** optimized for mobile and desktop
- 🔔 **Toast notifications** (Sonner) for all key user actions

## Project Conventions

- Keep `app/*` focused on route composition (`page.tsx`, `layout.tsx`, and route handlers).
- Keep feature logic grouped under `components/<feature>/`.
- Keep reusable primitives under `components/ui/*`.
- Use toast notifications (Sonner) for user feedback; keep inline validation for field errors.

## Localization

- Locale routes are URL-based: `/ar` and `/en`.
- The selected language is stored in the `adel-locale` cookie.
- All UI copy lives in `lib/i18n.ts` as typed AR/EN message dictionaries.

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login, returns access + refresh tokens |
| POST | `/api/auth/logout` | Clear refresh cookie |
| POST | `/api/auth/refresh` | Refresh access token |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List orders (user's own or all for admin) |
| POST | `/api/orders` | Create a new order |
| GET | `/api/orders/[id]` | Get order detail |
| POST | `/api/orders/[id]/status` | Update order status (admin) |

### Profile

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Get current user profile |
| PATCH | `/api/profile` | Update profile fields |

### Location Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/countries` | List available countries |
| GET | `/api/cities?country=XX` | List cities for a country |
| POST | `/api/locale` | Switch locale preference |

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@adel.com` | `Admin123!` |

## Environment Variables

See `.env.example` for the full list:

```env
DATABASE_URL=postgresql://...       # Neon PostgreSQL connection string
JWT_ACCESS_SECRET=...               # Min 32 characters
JWT_REFRESH_SECRET=...              # Min 32 characters
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
