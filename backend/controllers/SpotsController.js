// Load Models
var Spot = require('../models/Spot');

module.exports.create_spot = (req, res, next) => {
    var newSpot = new Spot({
        name: req.body.name,
        code: req.body.code,
        level_id: req.body.level_id
    });
    newSpot.save(function (err) {
        if (err)
            return res.status(400).json({
                success: false,
                msg: "Spot cannot be created"
            });
        res.status(201).json({
            success: true,
            msg: "Spot has been created"
        });
    });
}

module.exports.get_all_spots = (req, res, next) => {
    Spot.find((error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
      });
}

module.exports.get_spots = (req, res, next) => {
    Spot.find({
        level_id: req.query.level_id
      }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
      });
}

module.exports.get_spot = async (req, res, next) => {
    Spot.findById({
        _id: req.query.spot_id
      }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
      });
}