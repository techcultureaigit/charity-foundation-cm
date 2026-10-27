# Sewa Sankalp Website

Public website managed by the admin panel via MongoDB (`sewa-sankalp`).

## Run

```bash
# from repo root
npm install
npm run dev:website
```

Open: http://localhost:3000

Admin (content CMS): http://localhost:3001/admin

## Content source

- Pages, work areas, contact, verified impact → MongoDB
- Contact form → `enquiries` collection (visible in admin)
- Volunteer form → `volunteers` collection (visible in admin)

Unverified impact numbers are never shown.
