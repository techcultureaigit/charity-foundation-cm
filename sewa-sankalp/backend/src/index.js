const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const { connectDb } = require("./config/db");
const { port } = require("./config/env");
const { createApp } = require("./app");
const { ensureNavContent } = require("./utils/ensureNavContent");

async function main() {
  await connectDb();

  try {
    await ensureNavContent();
  } catch (err) {
    console.warn("[seed] ensureNavContent skipped:", err.message);
  }

  const app = createApp();
  app.listen(port, "0.0.0.0", () => {
    console.log(`[server] Sewa Sankalp API running on port ${port}`);
    console.log(`[server] Health: /api/health`);
  });
}

main().catch((err) => {
  console.error("[server] failed to start", err);
  process.exit(1);
});
