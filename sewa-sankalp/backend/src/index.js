const express = require("express");
const cors = require("cors");
const { connectDb } = require("./config/db");
const { port } = require("./config/env");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/error");

async function main() {
  await connectDb();

  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", routes);
  app.use(notFound);
  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`[server] Sewa Sankalp API running on http://localhost:${port}`);
    console.log(`[server] Health: http://localhost:${port}/api/health`);
  });
}

main().catch((err) => {
  console.error("[server] failed to start", err);
  process.exit(1);
});
