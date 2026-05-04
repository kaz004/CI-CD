const { createServer } = require("node:http");

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

function createApp() {
  return createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
      sendJson(res, 200, {
        message: "Hello from the GitHub Actions CI/CD demo app",
        service: "ci-cd-github-actions-demo"
      });
      return;
    }

    if (req.method === "GET" && req.url === "/health") {
      sendJson(res, 200, {
        status: "ok"
      });
      return;
    }

    sendJson(res, 404, {
      error: "Not found"
    });
  });
}

module.exports = {
  createApp
};
