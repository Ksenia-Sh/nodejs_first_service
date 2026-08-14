# nodejs-first-service

```
Runs a server and returns responses for different routes.

The file has a `.mjs` extension because the project uses ES Modules and the `import` syntax.
```

Runs a server and returns responses for different routes.

## Requirements

```
Node.js
npm
```

## Run the service

```bash
npm start
```

## Project structure

```text
nodejs-first-service/
├── src/
│   └── server.mjs
├── .gitignore
├── package.json
└── README.md
```

## endpoints

```
GET /
GET /health
GET any other route → 404 Not Found
```

## URL examples

```
http://localhost:3000/
http://localhost:3000/health
http://localhost:3000/unknown
```

## Stop the service

Press `Ctrl + C` in the terminal.

## Documentation mapping

### .mjs

`.mjs` is a file extension that shows file uses newer model ESM and developers can use ` import` and `export` statements directly.

Used in:

The project uses ES Modules, so the file has the .mjs extension. We chose ES Modules because they use the standard JavaScript module system, which is shared with modern browsers.

### import

`import` is a statement that allows developers to load JavaScript modules using ECMAScript Modules system

Used in:

```js
import { createServer } from "node:http";
```

### node:http

`node:http` is a built-in Node.js module for creating HTTP servers.

Used in:

```js
const server = createServer((request, response) => {
  // ...
});
```

### createServer

`createServer` is a function that creates and returns an HTTP server object.

We call the `createServer()` function to create an HTTP server. It returns a server `object`, which we store in the server variable. Then we call `server.listen()` to start listening for incoming requests.

Used in:

```js
const server = createServer((request, response) => {
  // ...
});
```

### request.method

`request.method` is a property of the request object. It contains the HTTP method of the incoming request. In our project, its value is `
"GET" for GET requests.

Used in:

```js
if (request.method === "GET" && request.url === "/")
if (request.method === "GET" && request.url === "/health")
if (request.method === "GET" && request.url !== "/" && request.url !== "/health")
```

### request.url

`request.url` is a property of the request object that contains the request path, such as `/` or `/health`.

Used in:

```js
 if (request.method === "GET" && request.url === "/")
 if (request.method === "GET" && request.url === "/health")
 if (request.method === "GET" && request.url !== "/" && request.url !== "/health")
```

### response.statusCode

`response.statusCode` is a property of the response object. It contains the HTTP status code of the response, such as 200 or 404.

Used in:

```js
response.statusCode = 200;
```

### response.setHeader

`response.setHeader`is a method of the response object that sets an HTTP header for the response.

Used in:

```js
response.setHeader("Content-Type", "text/plain");
response.setHeader("Content-Type", "application/json");
response.setHeader("Content-Type", " text/plain");
```

### response.end

`response.end`is a method of the response object that sends the response body and ends the HTTP response.

Used in:

```js
response.end("Hello from Node.js!");
response.end(JSON.stringify({ status: "ok" }));
response.end("Not Found");
```

### server.listen

`server.listen` is a method of the server object. It starts the server and listens for incoming requests on the specified port.

Used in:

```js
server.listen(port, () => {
```
