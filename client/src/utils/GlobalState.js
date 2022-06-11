import React, { createContext, useContext } from "react";
import { useGameReducer } from './reducers'

const CasinoContext = createContext();
const { Provider } = CasinoContext;

const CasinoProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useGameReducer({
    players: [],
    games: [],
    currentPlayer: '',
    currentPlayerCardImages: [],
    currentPlayerCardDescriptions: [],
    currentCommunityCardImages: [],
    currentCommunityCardDescriptions: [],
    playerResults: [],
    winnerResults: [],
    currentWallet: [],
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useCasinoContext = () => {
  return useContext(CasinoContext);
};

export { CasinoProvider, useCasinoContext };
