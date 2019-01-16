const express = require('express');
const router = express.Router();

const GrowersController = require('../controllers/GrowersController');

router.post('/CreateGrower', GrowersController.create_grower);

router.post('/ChooseGrower', GrowersController.choose_grower);

router.get('/GetGrowers', GrowersController.get_growers);

router.get('/GetGrower', GrowersController.get_grower);

module.exports = router;