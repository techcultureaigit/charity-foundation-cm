/**
 * Import ./data-export/*.json into MONGODB_URI (Atlas).
 * Usage:
 *   set MONGODB_URI=mongodb+srv://...
 *   node scripts/import-db.js
 *
 * Skips collections that already have documents (safe re-run).
 * Pass --force to wipe + reimport each collection.
 */
const fs = require("fs/promises");
const path = require("path");
const mongoose = require("mongoose");

const force = process.argv.includes("--force");
const mongoUri = process.env.MONGODB_URI;

async function main() {
  if (!mongoUri || mongoUri.includes("127.0.0.1") || mongoUri.includes("localhost")) {
    console.error("Set MONGODB_URI to your Atlas connection string first.");
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  const db = mongoose.connection.db;
  const outDir = path.join(__dirname, "../data-export");
  const files = (await fs.readdir(outDir)).filter(
    (f) => f.endsWith(".json") && !f.startsWith("_"),
  );

  for (const file of files) {
    const name = file.replace(/\.json$/, "");
    const raw = await fs.readFile(path.join(outDir, file), "utf8");
    const docs = JSON.parse(raw);
    if (!Array.isArray(docs) || docs.length === 0) {
      console.log(`[import] skip empty ${name}`);
      continue;
    }

    const col = db.collection(name);
    const existing = await col.countDocuments();
    if (existing > 0 && !force) {
      console.log(`[import] skip ${name} (already has ${existing} docs; use --force to replace)`);
      continue;
    }
    if (force && existing > 0) {
      await col.deleteMany({});
    }

    // Strip Mongo extended JSON quirks; keep _id strings as ObjectId when valid
    const cleaned = docs.map((doc) => {
      const row = { ...doc };
      if (row._id && typeof row._id === "string" && mongoose.Types.ObjectId.isValid(row._id)) {
        row._id = new mongoose.Types.ObjectId(row._id);
      } else if (row._id && row._id.$oid) {
        row._id = new mongoose.Types.ObjectId(row._id.$oid);
      }
      return row;
    });

    await col.insertMany(cleaned, { ordered: false });
    console.log(`[import] ${name}: ${cleaned.length} docs`);
  }

  console.log("[import] done");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
