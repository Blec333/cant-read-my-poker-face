const path = require("path");
const express = require("express");
const { authMiddleware } = require("./utils/auth");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
var cors = require("cors");
// const routes = require('./routes');// this is for restful api

const cwd = process.cwd();
const PORT = process.env.PORT || 3001;
const app = express();
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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const activity = cwd.includes("01-Activities")
  ? cwd.split("/01-Activities/")[1]
  : cwd;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(routes);// this is for restful api

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

startApolloServer(typeDefs, resolvers);

// HANDLE WEB SOCKETS BELOW ----------------------------------------------------------------------------------
const http = require("http");
const serverIo = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const PORTIO = process.env.PORT || 8080;

serverIo.listen(PORTIO, () =>
  console.log(`Server is Connected to Port ${PORTIO}`)
);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

const { addUser, removeUser } = require("./user");
io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callBack) => {
    const { user, error } = addUser({ id: socket.id, name, room });

    if (error) return callBack(error);
    socket.emit("message", {
      user: "Admin",
      text: `Welcome to ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "Admin", text: `${user.name} has joined!` });
    socket.join(user.room);
    callBack(null);
    socket.on("sendMessage", ({ message }) => {
      io.to(user.room).emit("message", {
        user: user.name,
        text: message,
      });
    });
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
      console.log(user);
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} just left the room`,
      });
      console.log("A disconnection has been made");
    });
  });
});

useEffect(() => {
  // The rest of the code
  socket.emit("join", { name, room }, (error) => {
    if (error) alert(error);
  });
}, [location.search]);
