// Load Models
var Stock = require('../models/Stock');

module.exports.create_stock = (req, res, next) => {
    var newStock = new Stock({});
    newStock.save(function (err) {
        if (err)
            return res.status(400).json({
                success: false,
                msg: "Stock cannot be created"
            });
        res.status(201).json({
            success: true,
            msg: "Stock has been created"
        });
    });
}

module.exports.choose_quantity = (req, res, next) => {
    Stock.findByIdAndUpdate({
        _id: req.body.stock_id
    }, {
        $set: {
            quantity: req.body.quantity
        }
    }, (error) => {
        if (error)
            return res.status(400).json({
                success: false,
                msg: "Stock cannot be updated"
            });
    })
}

module.exports.update_stock = (req, res, next) => {
    Stock.findByIdAndUpdate({
        product_id: req.body.product_id != null ? req.body.product_id : product_id,
        color_id: req.body.color_id != null ? req.body.color_id : color_id,
        size_id: req.body.size_id != null ? req.body.size_id : size_id,
        grower_id: req.body.grower_id != null ? req.body.grower_id : grower_id,
        grade_id: req.body.grade_id != null ? req.body.grade_id : grade_id,
        quantity: req.body.quantity != null ? req.body.quantity : quantity
    }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
    });
}

module.exports.get_stocks = (req, res, next) => {
    Stock.find({
        level_id: req.query.level_id
    }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
    });
}

module.exports.get_stock = async (req, res, next) => {
    Stock.findById({
        _id: req.query.stock_id
    }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
    });
}