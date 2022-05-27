const path = require("path");
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");

const MongodbStore = require("connect-mongodb-session")(session.Store);


const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();
const hbs = exphbs.create();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('01-Activities')
  ? cwd.split('/01-Activities/')[1]
  : cwd;


  const sess = {
    secret: "SuperDuper Secreter Secret Secret",
    cookie: { maxAge: 1000000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };


  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});



// HANDLE WEB SOCKETS BELOW ----------------------------------------------------------------------------------
const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { origin: "*" }
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (message) =>     {
        console.log(message);
        io.emit('message', `${socket.id.substr(0,2)} said ${message}` );   
    });
});

http.listen(8080, () => console.log('listening on http://localhost:8080') );
