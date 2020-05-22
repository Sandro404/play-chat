import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import io from "socket.io-client";

const socket = io("localhost:8080");

ReactDOM.render(<App socket={socket}/>, document.getElementById("root"));
