var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

let { PORT, NODE_ENV } = process.env;

server.listen(PORT);

if (NODE_ENV === "production") {
  app.use(express.static("dist"));
}
