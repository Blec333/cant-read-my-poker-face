import { gql } from '@apollo/client';

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

export const LOGIN_USER = gql`
  mutation login($playerName: String!, password: String!) {
    login(playerName: $playername, password: $password){
      token{
        player{
          _id
          name
        }
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

export const REMOVE_PLAYER = gql`
  mutations removePlayer($playerId: ID!){
    removePlayer(playerId: $playerID){
      _id
      name
    }
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

