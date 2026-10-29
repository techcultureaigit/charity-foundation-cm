const path = require("path");
const fs = require("fs");

// Prefer backend/.env, then monorepo .env (Render/Vercel inject env — dotenv is optional)
const candidates = [
  path.join(__dirname, "../../.env"),
  path.join(__dirname, "../../../.env"),
];
for (const file of candidates) {
  if (fs.existsSync(file)) {
    require("dotenv").config({ path: file });
    break;
  }
}

module.exports = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sewa-sankalp",
  adminApiKey: process.env.ADMIN_API_KEY || "sewa-admin-dev-key",
  siteUrl: (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  /** Public base for /api/files/... (set PUBLIC_API_URL on Vercel). */
  publicApiUrl: (() => {
    const raw =
      process.env.PUBLIC_API_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : null) ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      `http://127.0.0.1:${process.env.PORT || 4000}`;
    return String(raw).replace(/\/$/, "");
  })(),
  storeUploadsInDb:
    process.env.STORE_UPLOADS_IN_DB === "1" || Boolean(process.env.VERCEL),
  uploadsDir: path.resolve(
    __dirname,
    "../../",
    process.env.UPLOADS_DIR || "../website/public/uploads",
  ),
};
