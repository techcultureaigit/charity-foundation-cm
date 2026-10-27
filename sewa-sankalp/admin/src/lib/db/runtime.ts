import { connection } from "next/server";
import { connectMongo } from "@/lib/db/mongodb";

/** Marks the request dynamic before any DB / Date work (Next.js 16 cacheComponents). */
export async function requireDynamicDb() {
  await connection();
  return connectMongo();
}
