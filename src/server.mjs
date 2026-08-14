import { createServer } from "node:http";

const server = createServer((request, response) => {
  if (request.method === "GET" && request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello from Node.js!");
  }
  if (request.method === "GET" && request.url === "/health") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ status: "ok" }));
  }
  if (
    request.method === "GET" &&
    request.url !== "/health" &&
    request.url !== "/"
  ) {
    response.statusCode = 404;
    response.setHeader("Content-Type", " text/plain");
    response.end("Not Found");
  }
});
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
