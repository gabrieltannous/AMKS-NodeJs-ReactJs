const express = require('express');
const router = express.Router();

const PalletsController = require('../controllers/PalletsController');

//Gets
router.get('/GetPallets', PalletsController.get_pallets);

router.get('/GetPallet', PalletsController.get_pallet);

router.get('/GetPalletByStock', PalletsController.get_pallet_by_stock);

//Posts
router.post('/CreatePallet', PalletsController.create_pallet);

router.post('/ChooseDate', PalletsController.choose_date);

router.post('/RemovePallet', PalletsController.remove_pallet);

module.exports = router;