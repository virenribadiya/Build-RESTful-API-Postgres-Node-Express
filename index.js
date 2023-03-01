const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3000;

// https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.patch("/users",db.updateUser);
app.delete("/users/:id",db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
