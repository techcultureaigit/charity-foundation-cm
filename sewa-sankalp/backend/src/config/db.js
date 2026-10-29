const mongoose = require("mongoose");
const { mongoUri } = require("./env");

async function connectDb() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri, { bufferCommands: false , dbName: "sewa-sankalp"});
  const safe = String(mongoUri).replace(/\/\/([^:]+):([^@]+)@/, "//$1:***@");
  console.log("[db] connected:", safe);
}

module.exports = { connectDb };
