const { Schema, model } = require('mongoose');
const moment = require('moment');
const reactionSchema = require('./Reaction');

const gameSchema = new Schema(
  {
    winner: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    limit: {
      type: Number,
      // default: Date.now,
      // get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
    },
    playername: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
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
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  })


const Game = model('Game', gameSchema);

module.exports = Game;

