# Sewa Sankalp Backend (Express)

Proper Node.js API layer for website + admin.

## Structure

```text
src/
  index.js              # entry
  config/               # env + mongodb
  middleware/           # auth, errors
  models/               # mongoose schemas
  controllers/          # request handlers
  routes/               # /api public + /api/admin
  utils/                # mappers
```

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API base: `http://localhost:4000/api`

Admin routes need header: `x-admin-key: <ADMIN_API_KEY>`

## Main endpoints

Public:
- `GET /api/health`
- `GET /api/pages/:slug`
- `GET /api/work-areas|involvement|causes|events|impact|media|contact`
- `POST /api/enquiries`
- `POST /api/volunteers`

Admin:
- `GET/PUT /api/admin/pages...`
- CRUD for CMS collections
- `POST /api/admin/media/upload`
