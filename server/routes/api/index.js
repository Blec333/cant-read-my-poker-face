

const gameRoutes = require('./gameRoutes');
const playerRoutes = require('./playerRoutes');
const locationRoutes = require('./locationRoutes');
const router = require('express').Router();

router.use('/games', gameRoutes);
router.use('/players', playerRoutes);
router.use('/locations', locationRoutes)

module.exports = router;
