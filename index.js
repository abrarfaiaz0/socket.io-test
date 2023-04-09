const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const serverless = require("Serverless-http");
const { Server } = require("socket.io");
const io = new Server(server);
var path = require("path");
const router = express.Router();

app.use(express.static(path.join(__dirname, "public")));

router.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(5500, () => {
  console.log("listening on port 5500");
});

app.use("/.netlify/functions/api");
module.exports.handler = serverless(app);
