const { Schema, model } = require('mongoose');
const playerSchema = require('./Player');
const dayjs = require('dayjs');

const gameSchema = new Schema(
  {
    winner: {
      type: String,
      unique: true,
    },
    limit: {
      type: Number,
    },
    createdAt:{
      type: Date,
      default: Date.now,
      get: createdAtVal => dayjs(createdAtVal).format('MMM DD, YYYY [at] hh:mm:a')
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

