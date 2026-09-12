import { createServer } from "node:http";
import memes from "./memes.json" with { type: "json" };

let objVal = Object.values(memes);
function randomMemes(objVal) {
  let i = Math.round(Math.random());
  return objVal[i];
}

const server = createServer((request, response) => {
  const myURL = "http://localhost:3000" + request.url;
  const url = new URL(myURL);
  const data = url.searchParams.get("data");
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
  } else if (
    request.method === "GET" &&
    url.pathname === "/callback" &&
    data === "next_meme"
  ) {
    const randomMeme = randomMemes(objVal);
    response.statusCode = 200;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify(randomMeme));
  } else if (request.method === "GET" && url.pathname === "/callback") {
    response.statusCode = 400;
    response.setHeader("Content-Type", "text/plain");
    response.end("Bad Request");
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/plain");
    response.end("Not Found");
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
