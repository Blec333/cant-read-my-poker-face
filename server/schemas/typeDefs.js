const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Player {
    _id: ID
    name: String
    # There is now a field to store the user's password
    password: String
    games: [String]!
  }

  # Set up an Auth type to handle returning data from a player creating or user login
  type Auth {
    token: ID!
    player: Player
  }

  type Query {
    players: [Player]!
    player(playerId: ID!): Player
  }

  type Mutation {
    # Set up mutations to handle creating a player or logging into a player and return Auth type
    addplayer(playerName: String!, password: String!): Auth
    login(playerName: String!, password: String!): Auth

    addGame( game: String!, playerLimit: Number!, type: String!, players: ID!): Game
    removePlayer(playerId: ID!): Player
    removeGame( game: String!, playerLimit: Number!, type: String!, players: ID!): Game
  }
`;

module.exports = typeDefs;
