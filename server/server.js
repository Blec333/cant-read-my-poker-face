const path = require("path");
const express = require("express");
const { authMiddleware } = require("./utils/auth");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
// var cors = require("cors");
// const  io  = require('socket.io');
// const routes = require('./routes');// this is for restful api

const cwd = process.cwd();
const PORT = process.env.PORT || 3001;
const app = express();
// const INDEX = '/index.html';

// const http = require("http");
// const serverIo = http.createServer(app);
// const socketIo = require("socket.io")
// const io = socketIo(serverIo)
// //   , {
// //   cors: {
// //     handlePreflightRequest: (req, res) => {
// //       res.writeHead(200, {
// //       "Access-Control-Allow-Origin": "http://localhost:3000",
// //       "Access-Control-Allow-Methods": ["GET", "POST"],
// //       "Access-Control-Allow-Headers": ["my-custom-header"],
// //       "Access-Control-Allow-Credentials": true,
// //       });
// //       res.end();
// //     }
// //   }
// // })



// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT ,DELETE");
//   res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// const socket = require("socket.io-client")("ws://echo.websocket.org");

// // socket.on("connect_error", (err) => {
// //   console.log(`connect_error due to ${err.message}`);
// // });


// const ioServer = express()
//   .use((req, res)=> res.sendFile(INDEX,{root: __dirname}))
//ADD APOLLO SERVER------------------------
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});
//----------------------------------------

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const activity = cwd.includes("01-Activities")
  ? cwd.split("/01-Activities/")[1]
  : cwd;

// app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);// this is for restful api

// const ioServer = express()
//   .use((req,res)=>res.sendFile(INDEX,{root:__dirname}))

// io.on('connection', (socket) =>{
//   console.log('client connected');
//   socket.on('disconnect',()=> console.log('client disconnected'));
// });

// setInterval(()=> io.emit('time', new Date().toTimeString()),1000);

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};




// let users = [];

// const addUser = ({ id, playerName, roomId }) => {
//   if (!playerName || !roomId)
//   {
//   let playerName = "Dev";
//   let roomId = "Main"
//   }
//   // return { error: "name and room required." };
//   const user = { id, playerName, roomId };
//   users.push(user);
//   return { user };
// };

// const removeUser = (id) => {
//   const index = users.findIndex((user) => user.id === id);
//   return users[index];
// };


// io.on("connection", (socket) => {
//   console.log("a user connected");

//   socket.on("join", ({ playerName, roomId }, callBack) => {
//     const { user, error } = addUser({ id: socket.id, playerName, roomId });
//     if (error) return callBack(error);

//     socket.join(user.roomId);
//     socket.emit("message", {
//       user: "Admin",
//       text: `Welcome to ${user.roomId}`,
//     });

//     socket.broadcast
//       .to(user.roomId)
//       .emit("message", { user: "Admin", text: `${user.playerName} has joined!` });
//     callBack(null);

//     socket.on("sendMessage", ({ playerName, roomId, messages }) => {
//       io.to(user.roomId).emit("message", {
//         user: playerName,
//         messages: messages,
//       });
//     });


//     // socket.on("time",
//     //   setInterval(() => io.emit('time', new Date().toTimeString()), 1000)
//     //   );
    
//     // socket.on("sendMessage", ({ message }) => {
//     //   io.to(user.roomId).emit("message", {
//     //     user: user.name,
//     //     text: message,
//     //   });
//     // });


//     // socket.on("sendMessage", ({ message }) => {
//     //   io.to(user.roomId).emit("message", {
//     //     user: user.name,
//     //     text: message,
//     //   });
//     // });

//   });

//     socket.on("disconnect", () => {
//       const user = removeUser(socket.id);
//       console.log(user);
//       io.to(user.roomId).emit("message", {
//         user: "Admin",
//         text: `${user.playerName} just left the room`,
//       });
//     console.log("a user disconnected");
//     });
//   });






startApolloServer(typeDefs, resolvers);
