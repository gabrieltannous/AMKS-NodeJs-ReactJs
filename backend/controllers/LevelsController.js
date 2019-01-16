// Load Models
var Level = require('../models/Level');

module.exports.create_level = (req, res, next) => {
    var newLevel = new Level({
        name: req.body.name,
        code: req.body.code,
        section_id: req.body.section_id
    });
    newLevel.save(function (err) {
        if (err)
            return res.status(400).json({
                success: false,
                msg: "Level cannot be created"
            });
        res.status(201).json({
            success: true,
            msg: "Level has been created"
        });
    });
}

module.exports.get_levels = (req, res, next) => {
    Level.find({
        section_id: req.query.section_id
      }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
      });
}

module.exports.get_level = async (req, res, next) => {
    Level.findById({
        _id: req.query.level_id
      }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
      });
}