import React from "react";
import { Buffer } from "buffer";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { CasinoProvider } from "./utils/GlobalState";
import PlayerBoard from "./components/pages/PlayerBoard";
import CasinoContainer from "./components/CasinoContainer";
import PokerTable from "./components/pages/PokerTable";
import PlayerProfile from "./components/PlayerProfile";
import GameContainer from "./components/GameContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import "./index.css";

import { io } from "socket.io-client";

global.Buffer = Buffer;
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    const socket = io("http://localhost:8080");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 8080);
    });
    socket.on("time", (data) => setMessage(data));
    socket.on("disconnect", () => setMessage("server disconnected"));
  }, []);

  const handleMessage = async (event) => {
    setMessage(event.target.value);
  };
  function lastMessage() {
    console.log(message);
  }

  return (
    <ApolloProvider client={client}>
      {/* Wrap page elements in Router component to keep track of location state */}
      <Router>
        <CasinoProvider>
          <div className="flex-column justify-flex-start min-100-vh">
            <div className="container">
              <Routes>
                {/* Define routes to render different page components at different paths */}
                <Route path="/" element={<CasinoContainer />} />
                {/* Define a route that will take in variable data */}
                <Route path="/players/:playerId/" element={<PlayerProfile />} />
                {/* <Route path="/game/:gameId/" element={<GameContainer />} /> */}
                <Route path="/game/" element={<PokerTable />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </div>
          </div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="name"
            name="name"
            onChange={handleMessage}
            placeholder="Enter Message"
          />
          <div>
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => lastMessage(true)}
            >
              Send Message
            </button>
          </div>
        </CasinoProvider>
      </Router>
    </ApolloProvider>
  );
};

export default App;
