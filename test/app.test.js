const assert = require("node:assert/strict");
const { createApp } = require("../src/app");

function startTestServer() {
  const server = createApp();

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolve({
        baseUrl: `http://127.0.0.1:${address.port}`,
        close: () => new Promise((done) => server.close(done))
      });
    });
  });
}

async function testRootRoute() {
  const server = await startTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.service, "ci-cd-jenkins-demo");
  } finally {
    await server.close();
  }
}

async function testHealthRoute() {
  const server = await startTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(body, {
      status: "ok"
    });
  } finally {
    await server.close();
  }
}

async function run() {
  await testRootRoute();
  await testHealthRoute();
  console.log("All tests passed");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
