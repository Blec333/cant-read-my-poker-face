const { Player, Game } = require('../models');



// A function that executes the aggregate method on the player model and will calculate the friendCount by using the $sum operator
const friendCount = async (playerId) =>
  Player.aggregate(
    [
      {
        $unwind: '$friends',
      },
      {
        $group: { _id: playerId, friendCount: { $sum: '$friends' },
        },
      },
    ]);


module.exports = {

  // Get all players
  getPlayers(req, res) {
    Player.find()
      .then(async (players) => {
        const playerObj = {
          players,
          friendCount: await friendCount(req.params.playerId),
        };
        return res.json(playerObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Get a single player
  getSinglePlayer(req, res) {
    Player.findOne({ _id: req.params.playerId })
      .select('-__v')
      .lean()
      .then(async (player) =>
        !player
          ? res.status(404).json({ message: 'No player with that ID' })
          : res.json({
            player,
            friendCount: await friendCount(req.params.playerId),
          })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // create a new player
  createPlayer(req, res) {
    Player.create(req.body)
      .then((player) => res.json(player))
      .catch((err) => res.status(500).json(err));
  },

  updatePlayer(req, res) {
    Player.findOneAndUpdate(
      { _id: req.params.playerId },
      req.body,
      {
        new: true,
        runValidators: true
      }
      )
      .then(dbPlayerData => {
        if (!dbPlayerData) {
          res.status(404).json({ message: 'No player found with this id' });
          return;
        }
        res.json(dbPlayerData);
      })
      .catch(err => res.status(400).json(err));
  },

  // Delete a Player and remove them from the thought
  deletePlayer(req, res) {
    Player.findOneAndRemove({ _id: req.params.playerId })
      .then((player) =>
        !player
          ? res.status(404).json({ message: 'No such player exists' })
          : Thought.findOneAndUpdate(
            { players: req.params.playerId },
            { $pull: { Players: req.params.playerId } },
            { new: true }
          )
      )
      .then((thought) =>
        !thought
          ? res.status(404).json({
            message: 'player deleted, but no thoughts found',
          })
          : res.json({ message: 'player successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },



  // POST /api/players/:playerId/friends/:friendId
  addFriend(req, res) {
    // add friendId to playerId's friend list
    Player.findOneAndUpdate(
      { _id: req.params.playerId },
      { $addToSet: { friends: req.body.friendId } },
      { new: true, runValidators: true }
    )
      .then(player => {
        if (!player) {
          res.status(404).json({ message: 'No player found with this playerId' });
          return;
        }
        // add playerId to friendId's friend list
        Player.findOneAndUpdate(
          { _id: req.body.friendId },
          { $addToSet: { friends: req.params.playerId } },
          { new: true, runValidators: true }
        )
          .then(friend => {
            if (!friend) {
              res.status(404).json({ message: 'No player found with this friendId' })
              return;
            }
            res.json(player);
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  },

  // DELETE /api/players/:playerId/friends/:friendId
  deleteFriend(req, res) {
    // remove friendId from playerId's friend list
    Player.findOneAndUpdate(
      { _id: req.params.playerId },
      { $pull: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    )
      .then(player => {
        if (!player) {
          res.status(404).json({ message: 'No player found with this playerId' });
          return;
        }
        // remove playerId from friendId's friend list
        Player.findOneAndUpdate(
          { _id: req.params.friendId },
          { $pull: { friends: req.params.playerId } },
          { new: true, runValidators: true }
        )
          .then(friend => {
            if (!friend) {
              res.status(404).json({ message: 'No player found with this friendId' })
              return;
            }
            res.json({ message: 'Successfully deleted the friend' });
          })
          .catch(err => res.json(err));
      })
      .catch(err => res.json(err));
  }














};
