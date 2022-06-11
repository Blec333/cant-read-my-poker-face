import { useReducer } from "react";
import {
  UPDATE_PLAYERS,
  UPDATE_CURRENT_PLAYERS_WALLET,
  UPDATE_GAMES,
  UPDATE_CURRENT_GAME
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_PLAYERS:
      return {
        ...state,
        players: [...action.players],
      };

    case UPDATE_CURRENT_PLAYERS_WALLET:
      return {
        ...state,
        currentWallet: [...action.currentWallet],
      };

    case UPDATE_GAMES:
      return {
        ...state,
        games: [action.sgames],
      };

    case UPDATE_CURRENT_GAME:
      return {
        ...state,
        currentPlayerCardImages: [...action.currentPlayerCardImages],
        currentPlayerCardDescriptions: [...action.currentPlayerCardDescriptions],
        currentCommunityCardImages: [...action.currentCommunityCardImages],
        currentCommunityCardDescriptions: [...action.currentCommunityCardDescriptions],
        currentPlayerResults: [...action.currentPlayerResults],
        currentWinnerResults: [...action.currentWinnerResults],
      };

    default:
      return state;
  }
};

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState)
}
