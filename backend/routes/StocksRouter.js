const express = require('express');
const router = express.Router();

const StocksController = require('../controllers/StocksController');

router.post('/CreateStock', StocksController.create_stock);

router.post('/UpdateStock', StocksController.update_stock);

router.post('/ChooseQuantity', StocksController.choose_quantity);
/*
router.post('/ChooseProduce', StocksController.choose_produce);

router.post('/ChooseSize', StocksController.choose_size);

router.post('/ChooseColor', StocksController.choose_color);

router.post('/ChooseGrade', StocksController.choose_grade);

router.post('/ChooseGrower', StocksController.choose_grower);

router.post('/ChooseQuantity', StocksController.choose_quantity);
*/
router.get('/GetStocks', StocksController.get_stocks);

router.get('/GetStock', StocksController.get_stock);

module.exports = router;