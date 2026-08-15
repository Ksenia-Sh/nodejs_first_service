import { createServer } from "node:http";

const server = createServer((request, response) => {
  if (request.method === "GET" && request.url === "/") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.end("Hello from Node.js!");
  } else if (request.method === "GET" && request.url === "/health") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ status: "ok" }));
  } else if (request.method === "GET" && request.url === "/menu") {
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(
      JSON.stringify({
        inline_keyboard: [[{ text: "Ещё мем 🔄", callback_data: "next_meme" }]],
      }),
    );
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", " text/plain");
    response.end("Not Found");
  }
});
const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

/*GET /menu
  
    {
  "inline_keyboard": [
    [ { "text": "Ещё мем 🔄", "callback_data": "next_meme" } ]
  ]
}
*/
