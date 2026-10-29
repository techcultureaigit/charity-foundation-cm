const mongoose = require("mongoose");
const { GridFSBucket, ObjectId } = require("mongodb");

const BUCKET = "media_uploads";

function getBucket() {
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB not connected");
  return new GridFSBucket(db, { bucketName: BUCKET });
}

function uploadBuffer(buffer, { filename, contentType }) {
  return new Promise((resolve, reject) => {
    const bucket = getBucket();
    const stream = bucket.openUploadStream(filename, {
      contentType: contentType || "application/octet-stream",
    });
    stream.on("error", reject);
    stream.on("finish", () => resolve(stream.id));
    stream.end(buffer);
  });
}

function downloadToResponse(fileId, res, fallbackMime) {
  return new Promise((resolve, reject) => {
    const bucket = getBucket();
    const id = typeof fileId === "string" ? new ObjectId(fileId) : fileId;
    const download = bucket.openDownloadStream(id);
    download.on("file", (file) => {
      res.setHeader(
        "Content-Type",
        file.contentType || fallbackMime || "image/jpeg",
      );
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    });
    download.on("error", reject);
    download.on("end", resolve);
    download.pipe(res);
  });
}

module.exports = { uploadBuffer, downloadToResponse };
