// Load Models
var Grower = require('../models/Grower');
var Stock = require('../models/Stock');

module.exports.create_grower = (req, res, next) => {
    var newGrower = new Grower({
        name: req.body.name,
    });
    newGrower.save(function (err) {
        if (err)
            return res.status(400).json({
                success: false,
                msg: "Grower cannot be created"
            });
        res.status(201).json({
            success: true,
            msg: "Grower has been created"
        });
    });
}

module.exports.choose_grower = (req, res, next) => {
    Grower.findById({
        _id: req.body.grower_id
    }, (error, data) => {
        if (error)
            return res.status(400).json({
                success: false,
                msg: "Grower cannot be found"
            });
        Stock.findByIdAndUpdate({
            _id: req.body.stock_id
        }, {
            $set: {
                grower_id: data._id
            }
        }, (error) => {
            if (error)
                return res.status(400).json({
                    success: false,
                    msg: "Stock cannot be updated"
                });
        })
    })
}

module.exports.get_growers = (req, res, next) => {
    Grower.find((error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
    });
}

module.exports.get_grower = async (req, res, next) => {
    Grower.findById({
        _id: req.query.grower_id
    }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
    });
}