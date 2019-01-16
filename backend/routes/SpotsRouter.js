const express = require('express');
const router = express.Router();

const SpotsController = require('../controllers/SpotsController');

router.post('/CreateSpot', SpotsController.create_spot);

router.get('/GetAllSpots', SpotsController.get_all_spots);

router.get('/GetSpots', SpotsController.get_spots);

router.get('/GetSpot', SpotsController.get_spot);

module.exports = router;