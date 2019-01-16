const express = require('express');
const router = express.Router();
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const PositionsController = require('../controllers/PositionsController');

router.post('/CreatePosition', PositionsController.create_position);

router.get('/GetPositions', PositionsController.get_positions);

router.get('/GetPosition', PositionsController.get_position);

module.exports = router;