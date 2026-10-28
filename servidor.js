// Servidor local mínimo para probar la app (incluido el modo sin conexión e instalable).
// Uso: node servidor.js   →   http://localhost:8080
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = Number(process.env.PORT) || 8080;
const ROOT = __dirname;
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split("?")[0]);
  } catch {
    res.writeHead(400).end();
    return;
  }
  const file = path.join(ROOT, urlPath.replace(/^\/+$/, "") || "index.html");
  if (!file.startsWith(ROOT)) {
    res.writeHead(403).end();
    return;
  }
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404).end("No encontrado");
      return;
    }
    res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Numerología en http://localhost:${PORT}`);
  for (const nets of Object.values(os.networkInterfaces())) {
    for (const net of nets) {
      if (net.family === "IPv4" && !net.internal) console.log(`Desde el móvil (misma wifi): http://${net.address}:${PORT}`);
    }
  }
  console.log("Pulsa Ctrl+C para detenerlo.");
});
