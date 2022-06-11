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
    gameName: String
    winner: String
    playerLimit: Int
    gameType: String
    players: [Player]
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
    games: [Game]!
    game(gameId: ID!): Game
    locations: [Location]!
    location(locationId: ID!): Location
    me: Player
  }

  type Mutation {
    login(playerName: String!, password: String!): Auth

    addPlayer(playerName: String!, password: String!, account: Int): Auth
    removePlayer(playerId: ID!): Player
    updatePlayer( account: Int): Player

    addGame(gameName: String, winner: String, playerLimit: Int, gameType: String, playerId: String): Game
    removeGame(gameId: ID!): Game

    addPlayerToGame(gameId: ID!, playerId: String): Game
    removePlayerFromGame(gameId: ID!, playerId: String): Game

    addGameToPlayer(playerId: ID!, gameId: String): Player
    removeGameFromPlayer(playerId: ID!, gameId: String): Player
  }
`;


module.exports = typeDefs;
