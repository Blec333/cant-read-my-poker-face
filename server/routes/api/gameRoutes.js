const router = require('express').Router();
const {
  getGame,
  getSingleGame,
  createGame,
  updateGame,
  deleteGame,
} = require('../../controllers/gameController.js');

// /api/Thoughts
router.route('/')
  .get(getGame)
  .post(createGame);

// /api/Thoughts/:ThoughtId
router.route('/:thoughtId')
  .get(getSingleGame)
  .put(updateGame)
  .delete(deleteGame);

// // /api/players/:thoughtId/reactions
// router.route('/:thoughtId/reactions')
//   .post(addReaction);

// // /api/players/:thoughtId/reactions/:reactionId
// router.route('/:thoughtId/reactions/:reactionId')
//   .delete(removeReaction);



module.exports = router;
