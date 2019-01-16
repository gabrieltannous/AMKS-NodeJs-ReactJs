const express = require('express');
const router = express.Router();
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const LocationsController = require('../controllers/LocationsController');

router.post('/CreateLocation', LocationsController.create_location);

router.get('/GetLocations', LocationsController.get_locations);

router.get('/GetLocation', LocationsController.get_location);

router.get('/GetLocationByPosition', LocationsController.get_location_by_position);

module.exports = router;
