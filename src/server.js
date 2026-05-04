const { createApp } = require("./app");

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "0.0.0.0";

const server = createApp();

server.listen(port, host, () => {
  console.log(`ci-cd-jenkins-demo listening on http://${host}:${port}`);
});
