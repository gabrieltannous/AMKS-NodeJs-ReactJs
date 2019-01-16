// Load Models
var Pallet = require('../models/Pallet');
var Stock = require('../models/Stock');
var Produce = require('../models/Produce');
var Color = require('../models/Color');
var Size = require('../models/Size');
var moment = require('moment');
moment.locale('au');

//Gets

module.exports.get_pallets = async (req, res, next) => {
    Pallet.find({
        spot_id: req.query.spot_id
    }, async (error, pallets) => {
        if (error) return res.status(400).json(error);
        Stock.find({
            pallet_id: pallets[0]._id
        }, async (error, stocks) => {
            stocks.map(stock => {
                if (stock.produce_id !== undefined) {
                    Produce.findById({
                        _id: stock.produce_id
                    }).then(res => {
                        stock.produce_name = res.nick_name;
                        console.log(stock);
                    })
                }
            });
            pallets[0].stocks = stocks;
            return res.status(200).json(pallets);
        })
        await pallets.map(async pallet => {
            await Stock.find({
                pallet_id: pallet._id
            }, async (error, stocks) => {
                pallet.stocks = stocks;
            })
        });
    });
}

module.exports.get_pallet = async (req, res, next) => {
    Pallet.findById({
        _id: req.query.pallet_id
    }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
    });
}

module.exports.get_pallet_by_stock = async (req, res, next) => {
    Stock.findById({
        _id: req.query.stock_id
    }, (error, data) => {
        if (error) return res.status(400).json(error);
        Pallet.findById({
            _id: data.pallet_id
        }, (error, data) => {
            if (error) return res.status(400).json(error);
            return res.status(200).json(data);
        });
    })
}

//Posts

module.exports.create_pallet = (req, res, next) => {
    var newPallet = new Pallet({
        spot_id: req.body.spot_id,
        pallet_number: '-',
        date: moment().format("DD/MM/YYYY"),
        code: '-'
    });
    newPallet.save((err, data) => {
        if (err)
            return res.status(400).json({
                success: false,
                msg: "Pallet cannot be created"
            });

        var newStock = new Stock({
            pallet_id: data._id
        })
        newStock.save((err, data) => {
            if (err)
                return res.status(400).json({
                    success: false,
                    msg: "Pallet cannot be created"
                });
            res.status(201).json({
                success: true,
                msg: "Pallet/Stock has been created",
                stock: data
            });
        })
    });
}

module.exports.choose_date = (req, res, next) => {
    Pallet.findByIdAndUpdate({
        _id: req.body.pallet_id
    }, {
        $set: {
            date: req.body.date
        }
    }, (error) => {
        if (error)
            return req.status(400).json({
                success: false,
                msg: "Pallet cannot be updated"
            })
        res.status(201).json({
            success: true,
            msg: "Pallet date has been set"
        });
    })
}

module.exports.remove_pallet = async (req, res, next) => {
    Stock.remove({
        pallet_id: req.body.pallet_id
    }, (error) => {
        if (error) return res.status(400).json(error);
        Pallet.remove({
            _id: req.body.pallet_id
        }, (error) => {
            if (error) return res.status(400).json(error);
            res.status(201).json({
                success: true,
                msg: "Pallet has been deleted"
            });
        });
    })
}