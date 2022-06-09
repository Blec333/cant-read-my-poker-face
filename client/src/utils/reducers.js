import { useReducer } from "react";
import {
  UPDATE_PLAYERS,
  UPDATE_CURRENT_PLAYER,
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

    case UPDATE_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: [...action.currentPlayer],
      };

    case UPDATE_GAMES:
      return {
        ...state,
        games: [action.games],
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
