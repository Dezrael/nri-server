# NRI Server (Express + TypeScript + Prisma)

Backend for DnD skills app (React + TypeScript), built in vibecoding style with GitHub Copilot.

## Why Prisma

Prisma is chosen by default because it gives:
- strict type-safe queries from schema to service layer
- quick migrations and seed workflow
- easy onboarding for CRUD-heavy admin API

## Stack

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod validation

## Project Structure

```txt
src/
  app.ts
  server.ts
  routes/
  controllers/
  services/
  db/
  middlewares/
  types/
  validators/
prisma/
  schema.prisma
  seed.ts
```

## Environment

Create `.env` from `.env.example`:

```env
PORT=4000
CORS_ORIGIN="https://localhost:3000"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nri_server?schema=public"
ADMIN_PASSWORD="change_me"
ADMIN_TOKEN_SECRET="change_me_to_a_long_random_secret"
ADMIN_TOKEN_TTL_SECONDS=28800
```

## Install and Run

```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run seed
npm run dev
```

For production build:

```bash
npm run build
npm start
```

## API Endpoints

- `GET /health`

All API routes are under `/api/v1`.

Public read endpoints:

- `GET /api/v1/classes`
- `GET /api/v1/classes/:className/skills`
- `GET /api/v1/classes/:className/passives`
- `GET /api/v1/classes/:className/mushrooms`
- `GET /api/v1/skills?className=...`
- `GET /api/v1/passives?className=...`
- `GET /api/v1/mushrooms?className=...`

Write endpoints (create/update/delete):

- `POST /api/v1/skills`
- `POST /api/v1/passives`
- `POST /api/v1/mushrooms`
- `PUT /api/v1/skills/:id` (admin)
- `PUT /api/v1/passives/:id` (admin)
- `PUT /api/v1/mushrooms/:id` (admin)
- `DELETE /api/v1/skills/:id` (admin)
- `DELETE /api/v1/passives/:id` (admin)
- `DELETE /api/v1/mushrooms/:id` (admin)
- `POST /api/v1/classes` (admin)
- `DELETE /api/v1/classes/:className` (admin)

Admin auth endpoints:

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/bulk-import` (admin)

### Skills

- Required on create: `className`, `name`, `shortDescription`, `description`
- Optional on create with defaults:
  - `actionType` -> `"-"`
  - `range` -> `"-"`
  - `stat` -> `"-"`
  - `durationInCombat` -> `"-"`
  - `durationOutOfCombat` -> `"-"`
  - `damage` -> `"-"`
  - `inCombatCooldown` -> `"-"`
  - `outCombatCooldown` -> `"-"`
  - `outCombatCharges` -> `"-"`
  - `category` -> `"Основные"`
  - `concentration` -> `false`
  - `isChosen` -> `false`
- Optional on create without default:
  - `cooldownType` -> not set (`null` in DB)
  - `savingThrow` -> not set (`null` in DB)

### Passives

- Required on create: `className`, `name`, `text`
- Optional on create with defaults:
  - `isChosen` -> `false`

### Mushrooms

- Required on create: `className`, `name`, `baseEffect`
- Optional on create with defaults: `activationEffect`, `summonEffect`, `aspectEffect` -> `""`
- Optional on create with defaults:
  - `isChosen` -> `false`

## cURL Examples

Get skills for class:

```bash
curl "http://localhost:4000/api/v1/skills?className=Маг"
```

Create skill (minimal payload):

```bash
curl -X POST "http://localhost:4000/api/v1/skills" \
  -H "Content-Type: application/json" \
  -d '{
    "className": "Маг",
    "name": "Разряд",
    "shortDescription": "Короткое описание",
    "description": "Полное описание"
  }'
```

Admin login:

```bash
curl -X POST "http://localhost:4000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"password":"your_admin_password"}'
```

Admin update skill (with token):

```bash
curl -X PUT "http://localhost:4000/api/v1/skills/1" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"isChosen":true,"category":"Урон"}'
```

## Frontend Integration

1. Set frontend API base URL to `http://localhost:4000/api/v1`.
2. Keep cooldown state and cooldown tick logic in the client (local state or localStorage).
3. Use backend for CRUD of skills, passives and mushrooms only.

## Deploy to Vercel

This project is configured for Vercel serverless runtime via `api/index.ts` and `vercel.json`.

### 1. Create a Vercel project from GitHub

- Import this repository in Vercel.
- Keep Root Directory at the project root.
- Framework preset: `Other`.

### 2. Configure environment variables in Vercel

Add in Vercel Project Settings:

- `DATABASE_URL` - your production PostgreSQL URL (Neon/Vercel Postgres/Supabase)
- `CORS_ORIGIN` - allowed frontend origins (comma-separated if multiple)
- `ADMIN_PASSWORD` - admin password for `/api/v1/auth/login`
- `ADMIN_TOKEN_SECRET` - long random signing key for admin token
- `ADMIN_TOKEN_TTL_SECONDS` - optional token lifetime (default: `28800`)

`PORT` is not required on Vercel.

### 3. Run Prisma migration on production DB

Run once against production database:

```bash
npx prisma migrate deploy
```

Alternative: use included GitHub Actions workflow `.github/workflows/prisma-migrate-deploy.yml`.
It runs on push to `master`/`main` and can be started manually from Actions. If GitHub secret `DATABASE_URL` is not configured, migration job is skipped.

Additionally, CI type checks are configured in `.github/workflows/ci-typecheck.yml` and run on pull requests and pushes to `master`/`main`.

### 4. Verify deployment

- `https://<your-vercel-domain>/health`
- `https://<your-vercel-domain>/api/v1/skills`
