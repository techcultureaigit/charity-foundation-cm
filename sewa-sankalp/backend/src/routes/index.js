const { Router } = require("express");
const publicRoutes = require("./public");
const adminRoutes = require("./admin");

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true, service: "sewa-sankalp-backend" });
});

router.use("/", publicRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
