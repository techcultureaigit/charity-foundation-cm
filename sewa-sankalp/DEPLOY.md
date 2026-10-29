# Deploy Sewa Sankalp (Atlas + Render + Vercel)

## Architecture

| Piece | Host |
|-------|------|
| MongoDB | **MongoDB Atlas** (free M0) |
| Express API | **Vercel** (`sewa-sankalp-api`) — Render optional |
| Website + Admin | **Vercel** |

Local Mongo (`127.0.0.1`) cannot be used from Vercel/Render.

---

## 1. MongoDB Atlas

1. Create account → free **M0** cluster (any region near India, e.g. Mumbai if available).
2. **Database Access** → Add user (save username + password).
3. **Network Access** → Add IP `0.0.0.0/0` (allow Render + Vercel).
4. **Connect** → Drivers → copy URI, set DB name `sewa-sankalp`:

```text
mongodb+srv://USER:PASSWORD@cluster0.xxxxx.mongodb.net/sewa-sankalp?retryWrites=true&w=majority
```

### Export local data → import to Atlas

On your PC (from `sewa-sankalp/backend`):

```bash
npm run db:export
```

Then (PowerShell):

```powershell
$env:MONGODB_URI="mongodb+srv://USER:PASS@cluster0..../sewa-sankalp?retryWrites=true&w=majority"
npm run db:import
```

---

## 2. Backend on Render

1. [render.com](https://render.com) → **New Web Service** → connect GitHub repo.
2. Settings:
   - **Root Directory:** `sewa-sankalp/backend`
   - **Build:** `npm install`
   - **Start:** `npm start`
   - **Health Check Path:** `/api/health`
3. Environment:
   - `MONGODB_URI` = Atlas URI
   - `ADMIN_API_KEY` = same as admin `ADMIN_API_KEY`
   - `SITE_URL` = `https://your-website.vercel.app`
4. Deploy → copy API URL, e.g. `https://sewa-sankalp-api.onrender.com`

Free Render sleeps after idle; first request can be slow (~30s).

---

## 3. Vercel env (Website + Admin)

### Website

- `NEXT_PUBLIC_API_URL` = `https://sewa-sankalp-api.onrender.com/api`
- `API_URL` = same (if used server-side)

### Admin

- `API_URL` = `https://sewa-sankalp-api.onrender.com/api`
- `ADMIN_API_KEY` = same as Render
- `NEXT_PUBLIC_SITE_URL` = live website URL
- `ADMIN_PASSWORD` = your admin password

Redeploy both projects after saving env.

---

## 4. Uploads note

Images under `website/public/uploads` deploy with the website.
Admin uploads on Render’s free disk are **ephemeral** — for production media later use Cloudinary / S3, or keep uploading into the website repo for now.

---

## Checklist

- [ ] Atlas cluster + user + `0.0.0.0/0`
- [ ] `npm run db:export` then `db:import` to Atlas
- [ ] Render API healthy: `GET /api/health`
- [ ] Vercel website/admin point at Render `API_URL`
- [ ] Admin login works against live API
