# Sewa Sankalp Foundation

```
sewa-sankalp/
  admin/     # CMS  → http://localhost:3001/admin
  website/   # Public site → http://localhost:3000
```

Both apps use the same MongoDB database: `sewa-sankalp`

```
MONGODB_URI=mongodb://127.0.0.1:27017/sewa-sankalp
```

## Run

```bash
npm install

# Public website
npm run dev:website

# Admin panel (separate terminal)
npm run dev:admin
```

- Website: http://localhost:3000  
- Admin login: http://localhost:3001/admin/login  
- Password: `admin123`

## Admin → Website flow

1. Edit **Pages / Work Areas / Contact / Impact** in admin  
2. Save to MongoDB  
3. Website reads the same collections and updates live  
4. Website contact/volunteer forms create enquiries visible in admin  

Old live site (`sewasanklapfoundation.org`) had placeholder/lorem content and unverified stats. This rebuild follows the blueprint: verified content only.
