function notFound(req, res) {
  res.status(404).json({ ok: false, error: `Route not found: ${req.method} ${req.path}` });
}

function errorHandler(err, _req, res, _next) {
  console.error("[api]", err);
  if (err?.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      ok: false,
      error: "Please upload below than 4.5 MB.",
    });
  }
  const status = err.status || 500;
  res.status(status).json({
    ok: false,
    error: err.message || "Internal server error",
  });
}

module.exports = { notFound, errorHandler };
