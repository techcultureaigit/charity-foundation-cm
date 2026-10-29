/**
 * Export local MongoDB collections to ./data-export/*.json
 * Usage: node scripts/export-db.js
 */
const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");
const { mongoUri } = require("../src/config/env");

async function main() {
  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  const outDir = path.join(__dirname, "../data-export");
  await fs.mkdir(outDir, { recursive: true });

  const collections = await db.listCollections().toArray();
  const names = collections.map((c) => c.name).filter((n) => !n.startsWith("system."));

  const manifest = [];
  for (const name of names) {
    const docs = await db.collection(name).find({}).toArray();
    const file = path.join(outDir, `${name}.json`);
    await fs.writeFile(file, JSON.stringify(docs, null, 2), "utf8");
    manifest.push({ name, count: docs.length });
    console.log(`[export] ${name}: ${docs.length} docs`);
  }

  await fs.writeFile(
    path.join(outDir, "_manifest.json"),
    JSON.stringify({ exportedAt: new Date().toISOString(), mongoUri: "local", collections: manifest }, null, 2),
  );
  console.log(`[export] done → ${outDir}`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
