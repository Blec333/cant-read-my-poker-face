const { Schema, model } = require('mongoose');
const playerSchema = require('./Player');
const moment = require('moment');

const gameSchema = new Schema(
  {
    winner: {
      type: String,
      unique: true,
    },
    limit: {
      type: Number,
    },
    players: [
      {
        type: String,
        unique: true,      
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

gameSchema
  .virtual('playerCount')
  // Getter
  .get(function () {
    return this.players.length;
  })


const Game = model('Game', gameSchema);

module.exports = Game;

