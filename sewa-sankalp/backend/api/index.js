/**
 * Vercel serverless entry — Express app as a single function.
 */
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const { connectDb } = require("../src/config/db");
const { createApp } = require("../src/app");
const { ensureNavContent } = require("../src/utils/ensureNavContent");

const app = createApp();
let ready;

async function init() {
  if (!ready) {
    ready = (async () => {
      await connectDb();
      try {
        await ensureNavContent();
      } catch (err) {
        console.warn("[seed] ensureNavContent skipped:", err.message);
      }
    })();
  }
  await ready;
}

module.exports = async (req, res) => {
  await init();
  return app(req, res);
};
