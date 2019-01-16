var express = require('express');
var router = express.Router();

/* test API */
router.get('/', function (req, res, next) {
  res.status(200).send('API is working');
});

// Models
require("../models/Location");
require("../models/Position");
require("../models/Section");
require("../models/Level");
require("../models/Spot");
require("../models/Stock");
require("../models/Pallet");
require("../models/Produce");
require("../models/Color");
require("../models/Size");
require("../models/Grade");
require("../models/Grower");

// Routes
const locationsRoutes = require('./LocationsRouter');
const positionsRoutes = require('./PositionsRouter');
const sectionsRoutes = require('./SectionsRouter');
const levelsRoutes = require('./LevelsRouter');
const spotsRoutes = require('./SpotsRouter');
const palletsRoutes = require('./PalletsRouter');
const stocksRoutes = require('./StocksRouter');
const producesRoutes = require('./ProduceRouter');
const colorsRoutes = require('./ColorsRouter');
const sizesRoutes = require('./SizesRouter');
const gradesRoutes = require('./GradesRouter');
const growersRoutes = require('./GrowersRouter');

// Routers
router.use('/locations', locationsRoutes);
router.use('/positions', positionsRoutes);
router.use('/sections', sectionsRoutes);
router.use('/levels', levelsRoutes);
router.use('/spots', spotsRoutes);
router.use('/pallets', palletsRoutes);
router.use('/stocks', stocksRoutes);
router.use('/produces', producesRoutes);
router.use('/colors', colorsRoutes);
router.use('/sizes', sizesRoutes);
router.use('/grades', gradesRoutes);
router.use('/growers', growersRoutes);

router.use(function(req, res) {
  res.status(404).send("Page Not Found");
});

module.exports = router;
