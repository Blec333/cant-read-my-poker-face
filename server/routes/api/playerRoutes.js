const router = require('express').Router();
const {
  getPlayers,
  getSinglePlayer,
  createPlayer,
  updatePlayer,
  deletePlayer,
  addFriend,
  deleteFriend,
} = require('../../controllers/playerController');

// /api/players
router.route('/')
  .get(getPlayers)
  .post(createPlayer);

// /api/players/:playerId
router.route('/:playerId')
  .get(getSinglePlayer)
  .put(updatePlayer)
  .delete(deletePlayer);

// /api/players/:playerId/
router.route('/:playerId/friends')
.post(addFriend);

  
// /api/players/:playerId/
router.route('/:playerId/friends/:friendId')
  .delete(deleteFriend);

module.exports = router;
