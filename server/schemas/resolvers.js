const { AuthenticationError } = require('apollo-server-express');
const { Player } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    players: async () => {
      return Player.find();
    },

    player: async (parent, { playerId }) => {
      return Player.findOne({ _id: playerId });
    },
  },

  // 🔑 We call the signToken() function in the resolvers where we want to transmit data securely to generate a signed token:
  Mutation: {
    addPlayer: async (parent, { playerName, password }) => {
      const player = await Player.create({ playerName, password });
      const token = signToken(player);
      console.log({ token, player });
      return { token, player };
    },
    login: async (parent, { playerId, password }) => {
      const player = await Player.findOne({ _id: playerId });

      if (!player) {
        throw new AuthenticationError('No player with this name found!');
      }

      const correctPw = await player.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(player);
      return { token, player };
    },

    addGame: async (parent, { playerId, game }) => {
      return Player.findOneAndUpdate(
        { _id: playerId },
        {
          $addToSet: { games: game },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removePlayer: async (parent, { playerId }) => {
      return Player.findOneAndDelete({ _id: playerId });
    },
    removeGame: async (parent, { playerId, game }) => {
      return Player.findOneAndUpdate(
        { _id: playerId },
        { $pull: { games: game } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
