const { Game, Player } = require('../models');



module.exports = {

  // Get all games
  getGame(req, res) {
    Game.find()
      .select('-__v')
      .then((games) =>
        res.json(games)
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)})
  },

  // Get a game
  getSingleGame(req, res) {
    Game.findOne({ _id: req.params.gameId })
      .select('-__v')
      .then((game) => {
        !game
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(game)
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a game
  createGame(req, res) {
    console.log(req.body)
    Game.create(req.body)
      .then((game) => {
        Player.findOneAndUpdate(
          { playername: req.body.playername },
          { $push: { games: game._id } },
          { new: true }
        )
          .then((player) => {
            !player
              ? res.status(404).json({ message: 'No player found with this id' })
              : res.json(player)
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  },

  // Delete a game
  deleteGame(req, res) {
    Game.findOneAndDelete({ _id: req.params.gameId })
      .then((game) => {
        !game
          ? res.status(404).json({ message: 'No game with that ID' })
          : Player.findOneAndUpdate(
            { playername: game.playername },
            { $pull: { games: req.params.id } }
          )
            .then(() => {
              res.json({ message: 'game deleted!' })
            })
            .catch(err => res.status(500).json(err))
      })
      .catch((err) => res.status(500).json(err));
  },

  // Update a game
  updateGame(req, res) {
    Game.findOneAndUpdate(
      { _id: req.params.gameId },
      { $set: req.body },
      { new: true }
    )
      .then((game) =>
        !game
          ? res.status(404).json({ message: 'No game with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

}