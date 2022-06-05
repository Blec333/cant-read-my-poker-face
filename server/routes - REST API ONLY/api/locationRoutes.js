const router = require('express').Router();
const {
    getLocation,
    getSingleLocation
} = require('../../controllers - REST API ONLY/locationController.js')

// /api/locations
router.route('/')
    .get(getLocation);


// /api/locations/:LocationId
router.route('/:locationId')
    .get(getSingleLocation);

module.exports = router;