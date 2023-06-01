const http = require("http");
const fs = require("fs");
const url = require("url");
const cors = require("cors");

const todos = JSON.parse(fs.readFileSync("./todos.json"));

const server = http.createServer((req, res) => {
  // enable CORS
  cors()(req, res, () => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const method = req.method;

    if (path === "/todo" && method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todos));
    } else if (path === "/todo/new" && method === "POST") {
      let requestBody = "";

      req.on("data", (chunk) => {
        requestBody += chunk;
      });

      req.on("end", () => {
        const todo = {
          id: Math.floor(Math.random() * 1000000),
          text: JSON.parse(requestBody).text,
          complete: false,
        };

        todos.push(todo);
        fs.writeFileSync("./todos.json", JSON.stringify(todos));

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(todo));
      });
    } else if (path.startsWith("/todo/delete/") && method === "DELETE") {
      const id = parseInt(path.slice("/todo/delete/".length));
      const todo = todos.find((todo) => todo.id === id);

      const index = todos.indexOf(todo);

      todos.splice(index, 1);

      fs.writeFileSync("./todos.json", JSON.stringify(todos));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    } else if (path.startsWith("/todo/complete/") && method === "GET") {
      const id = parseInt(path.slice("/todo/complete/".length));
      const todo = todos.find((todo) => todo.id === id);

      todo.complete = !todo.complete;

      fs.writeFileSync("./todos.json", JSON.stringify(todos));

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
    }
  });
});

server.listen(5000, () => console.log(`Server is running on port`));
