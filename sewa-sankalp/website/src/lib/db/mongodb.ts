import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI?.trim() || "mongodb://127.0.0.1:27017/sewa-sankalp";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var websiteMongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.websiteMongooseCache ?? {
  conn: null,
  promise: null,
};

global.websiteMongooseCache = cached;

export async function connectMongo() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
