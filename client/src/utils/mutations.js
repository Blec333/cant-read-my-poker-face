import { gql } from "@apollo/client";

export const ADD_PLAYER = gql`
  mutation addPlayer($playerName: String!, $password: String!) {
    addPlayer(playerName: $playerName, password: $password) {
      token
      player {
        _id
        playerName
      }
    }
  }
`;

export const UPDATE_PLAYER = gql`
  mutation updatePlayer( $account: Int ){
    updatePlayer( account: $account){
      account
    }
  }
`;

export const REMOVE_PLAYER = gql`
  mutation removePlayer($playerId: ID!) {
    removePlayer(playerId: $playerID) {
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($playerName: String!, $password: String!) {
    login(playerName: $playerName, password: $password) {
      token
      player {
        _id
        playerName
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation 
    addGame($gameName: String, $winner: String, $playerLimit: Int, $gameType: String, $playerId: String) {
    addGame(gameName: $gameName, winner: $winner, playerLimit: $playerLimit, gameType: $gameType, playerId: $playerId){
    _id
    gameName
    winner
    playerLimit
    gameType
    players
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($_id: ID!) {
    removeGame(_id: $gameId) {
      _id
    }
  }
`;

export const ADD_PLAYER_TO_GAME = gql`
  mutation addPlayerToGame($_id: ID!, $playerId: String!) {
    addPlayerToGame(_id: $gameId, playerId: $playerId) {
      _id
      name
      playerLimit
      type
      players {
        playerId
        playerName
        password
        account
      }
    }
  }
`;

export const ADD_GAME_TO_PLAYER = gql`
  mutation addGameToPlayer($_id: ID!, $gameId: String!) {
    addGameToPlayer(_id: $playerId, gameId: $gameId) {
      _id
      playerName
      password
      account
      games {
        gameId
        name
        playerLimit
        type
      }
    }
  }
`;

export const REMOVE_PLAYER_FROM_GAME = gql`
  mutation removePlayerFromGame($_id: ID!, $gameId: String!) {
    removePlayerFromGame(_id: $playerId, gameId: $gameId) {
      gameId
      name
      playerLimit
      type
      players {
        _id
        playerName
      }
    }
  }
`;
