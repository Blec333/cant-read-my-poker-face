// const express = require("express");
// const socketIo = require("socket.io");
// const http = require("http");
// const PORT = process.env.PORT || 8080;
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:8080",
//   },
// }); //in case server and client run on different urls
// io.on("connection", (socket) => {
//   console.log("client connected: ", socket.id);

//   socket.join("clock-room");

//   socket.on("disconnect", (reason) => {
//     console.log(reason);
//   });
// });

// io.emit("some event", {
//   someProperty: "some value",
//   otherProperty: "other value",
// });

// io.on("connection", (socket) => {
//   socket.broadcast.emit("hi");
// });

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });
// setInterval(() => {
//   io.to("clock-room").emit("time", new Date());
// }, 1000);

// server.listen(PORT, (err) => {
//   if (err) console.log(err);
//   console.log("Server running on Port", PORT);
// });

// module.exports = router;

// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "../modals/Game.js");
// });

// io.emit("some event", {
//   someProperty: "some value",
//   otherProperty: "other value",
// });

// io.on("connection", (socket) => {
//   socket.broadcast.emit("hi");
// });

// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

// server.listen(3000, () => {
//   console.log("listening on *:3000");
// });
