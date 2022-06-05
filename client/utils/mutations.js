import { gql } from '@apollo/client';
import { Player } from '../../server/models';

export const ADD_PLAYER = gql`
  mutation addPlayer($name: String!, password: String!) {
    addPlayer(name: $name) {
      token
      player{
        _id
        name
      }
    }
  }
`;

export const REMOVE_PLAYER = gql`
  mutations removePlayer($playerId: ID!){
    removePlayer(playerId: $playerID){
      _id
      name
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($playerName: String!, password: String!) {
    login(playerName: $playername, password: $password){
      token
        player{
          _id
          name
      }
    }
  }
`;

export const ADD_GAME = gql`
  mutation addGame($game: String!, $playerLimit: Number!, t$ype: String!, $players: ID!){
    addGame(game: $game, playerLimit: $playerLimit, type: $type, players: $players)
    _id
    name
    playerLimit
    type
    game
  }
`;

export const REMOVE_GAME = gql`
  mutations removeGame($game: String!, $playerLimit: Number!, $type: String!, $players: ID!){
    removeGame(game: $game, playerLimit: $playerLimit, type: $type, players: $players){
      _id
      name
      type
    }
  }
`;

// add game to Player
export const ADD_PLAYER_TO_GAME = gql`
  mutations addPlayerToGame($game: String!, $playerLimit: Number!, $type: String!, $players: ID!, $name: String!){
    addPlayerToGame(game: $game, playerLimit: $playerLimit, type: $type, players: $players, name: $name ){
      _id
      name
      type
    }
  }
`;

export const ADD_GAME_TO_PLAYER = gql`
  mutations addGameToPlayer($game: String!, $playerLimit: Number!, $type: String!, $players: ID!, $name: String){
    
  }
`;
// add player to game

// remove player from game