import { connection } from "next/server";
import { connectMongo } from "@/lib/db/mongodb";

export async function requireDynamicDb() {
  await connection();
  return connectMongo();
}
