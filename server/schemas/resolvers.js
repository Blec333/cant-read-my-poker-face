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
    me: async (parent, args, context) => {
      if (context.player) {
        return Player.findOne({ _id: context.player._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  // 🔑 We call the signToken() function in the resolvers where we want to transmit data securely to generate a signed token:
  Mutation: {
    addPlayer: async (parent, args) => {
      const player = await Player.create(args);
      const token = signToken(player);
      return { token, player };
    },
    login: async (parent, { playerName, password }) => {
      const player = await Player.findOne({ playerName });
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
    updatePlayer: async (parent, args, context) => {
      try {
        if(context.player._id) {
          return await Player.findOneAndUpdate(context.player._id, args, { new: true });
        }else{
          console.log(args)
        }
      } catch (err) {
        console.log(err)
      }
    },
    removePlayer: async (parent, { playerId }) => {
      return Player.findOneAndDelete({ _id: playerId });
    },

    addGame: async (
      parent,
      { gameName, winner, playerLimit, gameType, playerId }
    ) => {
      try {
        const game = await Game.create({
          gameName,
          winner,
          playerLimit,
          gameType,
          players: [ playerId ],
        });
        return game;
      } catch (err) {
        console.log(err);
      }
    },

    removeGame: async (parent, { gameId }) => {
      return Game.findOneAndDelete({ _id: gameId });
    },

    addPlayerToGame: async (parent, { gameId, playerId }) => {
      return await Game.findByIdAndUpdate(
        gameId,
        {
          $addToSet: { players: playerId },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    addGameToPlayer: async (parent, { playerId, gameId }) => {
      return await Player.findByIdAndUpdate(
        playerId,
        {
          $addToSet: { games: gameId },
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
