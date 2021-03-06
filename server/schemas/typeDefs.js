const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Player {
    _id: ID
    playerName: String
    account: Int
    wallet: Int
    games: [Game]
  }

  type Game {
    _id: ID
    gameName: String
    winner: String
    playerLimit: Int
    gameType: String
    players: [String]
  }

  type Location {
    _id: ID
    location: String
    difficulty: String
  }

  type Auth {
    token: ID
    player: Player
  }

  type Query {
    players: [Player]
    player(playerId: ID!): Player
    games: [Game]
    game(gameId: ID!): Game
    locations: [Location]
    location(locationId: ID!): Location
    me: Player
  }

  type Mutation {
    addPlayer(playerName: String!, password: String!): Auth
    login(playerName: String!, password: String!): Auth
    updatePlayer(account: Int, wallet: Int): Player
    removePlayer(playerId: ID!): Player

    addGame(gameName: String, winner: String, playerLimit: Int, gameType: String, playerId: String): Game
    removeGame(gameId: ID!): Game

    addPlayerToGame(gameId: ID!, playerId: String): Game
    removePlayerFromGame(gameId: ID!, playerId: String): Game

    addGameToPlayer(playerId: ID!, gameId: String): Player
    removeGameFromPlayer(playerId: ID!, gameId: String): Player
  }
`;


module.exports = typeDefs;
