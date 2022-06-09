const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema to create playername model
const playerSchema = new Schema(
  {
    playerName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
       minlength: 8,
    },
    account: {
      type: Number,
      default: 1000000,
    },
    games: [
      {
        type: Schema.Types.ObjectId,
        ref: "Game",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "Player",
      },
    ],
  },
  {
    toJSON: {
      // getters: true,
      virtuals: true,
    },
    id: false, //don't return the id of the element(s)
  }
);

playerSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

playerSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

playerSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  })
  // Setter to set the playername
  .set(function (virtual) {
    const playername = virtual;
    this.set({ playername });
  });

const Player = model("Player", playerSchema);

module.exports = Player;
