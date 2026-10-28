const { adminApiKey } = require("../config/env");

function requireAdmin(req, res, next) {
  const key = req.header("x-admin-key") || "";
  if (!key || key !== adminApiKey) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }
  return next();
}

module.exports = { requireAdmin };
