const express = require('express');
const router = express.Router();

const SizesController = require('../controllers/SizesController');

router.post('/CreateSize', SizesController.create_size);

router.post('/ChooseSize', SizesController.choose_size);

router.get('/GetSizes', SizesController.get_sizes);

router.get('/GetSize', SizesController.get_size);

module.exports = router;