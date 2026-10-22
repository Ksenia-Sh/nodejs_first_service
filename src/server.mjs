import { createServer } from "node:http";
import memes from "./memes.json" with { type: "json" };

let objVal = Object.values(memes);
function randomMemes(objVal) {
  let i = Math.round(Math.random());
  return objVal[i];
}
const myTokenURL = `https://api.telegram.org/bot${process.env.TG_TOKEN}/getMe`;
const getUpdatesURL = `https://api.telegram.org/bot${process.env.TG_TOKEN}/getUpdates`;

const server = createServer((request, response) => {
  const myURL = `http://localhost:${process.env.PORT}` + request.url;
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
  } else if (request.method === "POST" && url.pathname === "/callback") {
    let body = "";
    request.on("data", (chunk) => (body += chunk));
    request.on("end", () => {
      try {
        const bodyObj = JSON.parse(body);
        if (bodyObj.data === "next_meme") {
          const randomMeme = randomMemes(objVal);
          response.statusCode = 200;
          response.setHeader("Content-Type", "application/json");
          response.end(JSON.stringify(randomMeme));
        } else {
          response.statusCode = 400;
          response.setHeader("Content-Type", "text/plain");
          response.end("Invalid data");
        }
      } catch (error) {
        response.statusCode = 400;
        response.setHeader("Content-Type", "text/plain");
        response.end("Invalid JSON");
      }
    });
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

server.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT}`);
  // fetch(myTokenURL)
  //   .then((response) => response.json())
  //   .then((text) => console.log(text))
  fetch(getUpdatesURL)
    .then((response) => response.json())
    .then((data) => fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify({ chat_id: data.result[0].message.chat.id, text: "BOT answer" })
    }))
    .then((response) => response.json())
    .then((text) => console.log(text))
});
