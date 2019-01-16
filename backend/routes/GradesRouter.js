const express = require('express');
const router = express.Router();

const GradesController = require('../controllers/GradesController');

router.post('/CreateGrade', GradesController.create_grade);

router.post('/ChooseGrade', GradesController.choose_grade);

router.get('/GetGrades', GradesController.get_grades);

router.get('/GetGrade', GradesController.get_grade);

module.exports = router;