// Load Models
var Position = require('../models/Position');

module.exports.create_position = (req, res, next) => {
    var newPosition = new Position({
        name: req.body.name,
        code: req.body.code,
        location_id: req.body.location_id
    });
    newPosition.save(function (err) {
        if (err)
            return res.status(400).json({
                success: false,
                msg: "Position cannot be created"
            });
        res.status(201).json({
            success: true,
            msg: "Position has been created"
        });
    });
}

module.exports.get_positions = async (req, res, next) => {
    Position.find({
        location_id: req.query.location_id
      }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
      });
}

module.exports.get_position = async (req, res, next) => {
    Position.findById({
        _id: req.query.position_id
      }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
      });
}