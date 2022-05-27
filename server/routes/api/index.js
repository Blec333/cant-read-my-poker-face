

const thoughtRoutes = require('./thoughtRoutes');
const playerRoutes = require('./playerRoutes');
const router = require('express').Router();

router.use('/thoughts', thoughtRoutes);
router.use('/players', playerRoutes);

module.exports = router;
