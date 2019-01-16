const express = require('express');
const router = express.Router();
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const SectionsController = require('../controllers/SectionsController');

router.post('/CreateSection', SectionsController.create_section);

router.get('/GetSections', SectionsController.get_sections);

router.get('/GetSection', SectionsController.get_section);

module.exports = router;