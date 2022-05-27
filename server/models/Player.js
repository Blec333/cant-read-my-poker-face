const { Schema, model } = require('mongoose');

// Schema to create playername model
const playerSchema = new Schema(
  {
    playername: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
       minlength: 8,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  {
    toJSON: {
      // getters: true,
      virtuals: true,
    },
    id: false,//don't return the id of the element(s)
  }
);

playerSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })
  // Setter to set the playername
  .set(function (virtual) {
    const playername = virtual;
    this.set({ playername });
  });


const Player = model('Player', playerSchema);

module.exports = Player;
