var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var ChatManager = require("./ChatManager");

let { PORT, NODE_ENV } = process.env;

const chatManager = new ChatManager();

io.on("connection", function (socket) {
  socket.on("joinChat", (name) => chatManager.addClient(socket, name));
});

server.listen(PORT);

if (NODE_ENV === "production") {
  app.use(express.static("dist"));
}
