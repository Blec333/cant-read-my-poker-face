import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import PlayerBoard from "./components/pages/PlayerBoard";
import LandingPage from "./components/pages/LandingPage";
import CasinoContainer from "./components/CasinoContainer";
import PokerTable from "./components/pages/PokerTable";
import PlayerProfile from "./components/PlayerProfile";
import GameContainer from "./components/GameContainer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";

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
  return (
    <ApolloProvider client={client}>
      {/* Wrap page elements in Router component to keep track of location state */}
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <Routes>
              {/* Define routes to render different page components at different paths */}
              <Route path="/" element={<CasinoContainer />} />
              {/* Define a route that will take in variable data */}
              <Route path="/players/:playerId/" element={<PlayerProfile />} />
              <Route path="/game/:gameId/" element={<GameContainer />} />
              <Route path="/game/" element={<PokerTable />} />
              <Route path="/playerBoard+/" element={<PlayerBoard />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
