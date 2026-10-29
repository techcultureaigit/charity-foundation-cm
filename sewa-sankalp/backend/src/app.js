const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/error");

function createApp() {
  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
