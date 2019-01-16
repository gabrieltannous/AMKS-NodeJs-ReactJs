const express = require('express');
const router = express.Router();

const LevelsController = require('../controllers/LevelsController');

router.post('/CreateLevel', LevelsController.create_level);

router.get('/GetLevels', LevelsController.get_levels);

router.get('/GetLevel', LevelsController.get_level);

module.exports = router;