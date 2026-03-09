# NRI Server (Express + TypeScript + Prisma)

Backend for DnD skills app (React + TypeScript).

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
CORS_ORIGIN="http://localhost:5173"
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/nri_server?schema=public"
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

### Skills

- `GET /api/v1/skills?className=...`
- `POST /api/v1/skills`
- `PUT /api/v1/skills/:id`
- `DELETE /api/v1/skills/:id`

### Passives

- `GET /api/v1/passives?className=...`
- `POST /api/v1/passives`
- `PUT /api/v1/passives/:id`
- `DELETE /api/v1/passives/:id`

### Mushrooms

- `GET /api/v1/mushrooms?className=...`
- `POST /api/v1/mushrooms`
- `PUT /api/v1/mushrooms/:id`
- `DELETE /api/v1/mushrooms/:id`

## cURL Examples

Get skills for class:

```bash
curl "http://localhost:4000/api/v1/skills?className=Mage"
```

Create skill:

```bash
curl -X POST "http://localhost:4000/api/v1/skills" \
  -H "Content-Type: application/json" \
  -d '{
    "className": "Mage",
    "name": "Lightning Bolt",
    "description": "Single target shock damage",
    "inCombatCooldownTurns": 2,
    "outCombatCooldownMinutes": 6
  }'
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
- `CORS_ORIGIN` - your frontend URL

`PORT` is not required on Vercel.

### 3. Run Prisma migration on production DB

Run once against production database:

```bash
npx prisma migrate deploy
```

Alternative: use included GitHub Actions workflow `.github/workflows/prisma-migrate-deploy.yml`.
It runs on push to `master`/`main` and can be started manually from Actions.

Required GitHub repository secret:

- `DATABASE_URL` - production PostgreSQL connection string

Additionally, CI type checks are configured in `.github/workflows/ci-typecheck.yml` and run on pull requests and pushes to `master`/`main`.

### 4. Verify deployment

- `https://<your-vercel-domain>/health`
- `https://<your-vercel-domain>/api/v1/skills`
