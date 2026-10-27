import { ensureSeedData } from "../src/lib/db/seed";

async function main() {
  await ensureSeedData();
  console.log("Seed complete → database: sewa-sankalp");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
