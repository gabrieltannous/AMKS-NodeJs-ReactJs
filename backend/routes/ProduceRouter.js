const express = require('express');
const router = express.Router();

const ProducesController = require('../controllers/ProducesController');

router.post('/CreateProduce', ProducesController.create_produce);

router.post('/ChooseProduce', ProducesController.choose_produce);

router.get('/GetProduces', ProducesController.get_produces);

router.get('/GetProduce', ProducesController.get_produce);

module.exports = router;