const { AuthenticationError } = require("apollo-server-express");
const { Player, Game, Location } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    players: async () => {
      return Player.find();
    },
    player: async (parent, { playerId }) => {
      return Player.findOne({ _id: playerId });
    },

    games: async () => {
      return Game.find();
    },
    game: async (parent, { gameId }) => {
      return Game.findOne({ _id: gameId });
    },

    locations: async () => {
      return Location.find();
    },
    location: async (parent, { locationId }) => {
      return Location.findOne({ _id: locationId });
    },
  },

  // 🔑 We call the signToken() function in the resolvers where we want to transmit data securely to generate a signed token:
  Mutation: {
    login: async (parent, { playerName, password }) => {
      const player = await Player.findOne({ playerName: playerName });
      if (!player) {
        throw new AuthenticationError("No player with this name found!");
      }
      const correctPw = await player.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(player);
      return { token, player };
    },

    addPlayer: async (parent, { playerName, password, account }) => {
      const player = await Player.create({ playerName, password, account });
      const token = signToken(player);
      console.log({ token, player });
      return { token, player };
    },
    removePlayer: async (parent, { playerId }) => {
      return Player.findOneAndDelete({ _id: playerId });
    },

    addGame: async (parent, { playerId, winner, playerLimit, type }) => {
      return (game = await Game.create(
        { winner, playerLimit, type },
        {
          $addToSet: { players: playerId },
        }
      ));
    },
    removeGame: async (parent, { gameId }) => {
      return Game.findOneAndDelete({ _id: gameId });
    },

    addPlayerToGame: async (parent, { gameId, playerId }) => {
      return await Game.findOneAndUpdate(
        { _id: gameId },
        {
          $addToSet: { players: playerId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removePlayerFromGame: async (parent, { gameId, playerId }) => {
      return Game.findOneAndUpdate(
        { _id: gameId },
        { $pull: { players: playerId } },
        { new: true }
      );
    },

    addGameToPlayer: async (parent, { playerId, gameId }) => {
      return await Player.findOneAndUpdate(
        { _id: playerId },
        {
          $addToSet: { games: gameId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeGameFromPlayer: async (parent, { playerId, gameId }) => {
      return Player.findOneAndUpdate(
        { _id: playerId },
        { $pull: { games: gameId } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
