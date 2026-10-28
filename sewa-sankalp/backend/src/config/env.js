const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sewa-sankalp",
  adminApiKey: process.env.ADMIN_API_KEY || "sewa-admin-dev-key",
  siteUrl: (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  uploadsDir: path.resolve(
    __dirname,
    "../../",
    process.env.UPLOADS_DIR || "../website/public/uploads",
  ),
};
