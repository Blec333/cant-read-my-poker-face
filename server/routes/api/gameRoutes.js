const router = require('express').Router();
const {
  getGame,
  getSingleGame,
  createGame,
  updateGame,
  deleteGame,
} = require('../../controllers/gameController.js');

// /api/Games
router.route('/')
  .get(getGame)
  .post(createGame);

// /api/Games/:GameId
router.route('/:gameId')
  .get(getSingleGame)
  .put(updateGame)
  .delete(deleteGame);





module.exports = router;
