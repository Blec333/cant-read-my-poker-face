const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Player {
    _id: ID!
    playerName: String
    password: String
    account: Int
    games: [Game]
  }

  type Game {
    _id: ID!
    winner: String
    playerLimit: Int
    type: String
    players: [String]
  }

  type Location {
    _id: ID!
    location: String
    difficulty: String
  }

  type Auth {
    token: ID!
    player: Player
  }

  type Query {
    players: [Player]!
    player(playerId: ID!): Player
    games: [Player]!
    game(gameId: ID!): Game
    locations: [Location]!
    location(locationId: ID!): Location
  }

  type Mutation {
    login(playerName: String!, password: String!): Auth

    addPlayer(playerName: String!, password: String!, account: Int): Auth
    removePlayer(playerId: ID!): Player

    addGame( winner: String, playerLimit: Int, type: String, playerId: String, name: String): Game
    removeGame( gameId: ID!): Game

    addPlayerToGame(gameId: ID!, playerId: String): Game
    removePlayerFromGame(gameId: ID!, playerId: String): Game

    addGameToPlayer(playerId: ID!, gameId: String): Player
    removeGameFromPlayer(playerId: ID!, gameId: String): Player
  }
`;


module.exports = typeDefs;
