import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import PlayerProfile from './pages/PlayerProfile';
import GameContainer from './components/GameContainer';
import Header from './components/Header';
import Footer from './components/Footer';

const client = new ApolloClient({
  uri: '/graphql',
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
        <Routes>
          {/* Define routes to render different page components at different paths */}
          <Route 
            path="/" 
            element={<LandingPage />} 
          />
          {/* Define a route that will take in variable data */}
          <Route 
            path="/players/:playerId/" 
            element={<PlayerProfile />} 
          />
          <Route 
            path="/game/:gameId/" 
            element={<GameContainer />} 
          />
        </Routes>
      </div>
      <Footer />
    </div>
  </Router>
</ApolloProvider>

)

}


export default App;
