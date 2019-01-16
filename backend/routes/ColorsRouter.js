const express = require('express');
const router = express.Router();

const ColorsController = require('../controllers/ColorsController');

router.post('/CreateColor', ColorsController.create_color);

router.post('/ChooseColor', ColorsController.choose_color);

router.get('/GetColors', ColorsController.get_colors);

router.get('/GetColor', ColorsController.get_color);

module.exports = router;