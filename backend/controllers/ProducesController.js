// Load Models
var Produce = require('../models/Produce');
var Stock = require('../models/Stock');

module.exports.create_produce = (req, res, next) => {
  var newProduce = new Produce({
    name: req.body.name,
  });
  newProduce.save(function (err) {
    if (err)
      return res.status(400).json({
        success: false,
        msg: "Produce cannot be created"
      });
    res.status(201).json({
      success: true,
      msg: "Produce has been created"
    });
  });
}

module.exports.choose_produce = (req, res, next) => {
  Produce.findById({
    _id: req.body.produce_id
  }, (error, data) => {
    if (error)
      return res.status(400).json({
        success: false,
        msg: "Produce cannot be found"
      });
    Stock.findByIdAndUpdate({
      _id: req.body.stock_id
    }, {
      $set: {
        produce_id: data._id
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

module.exports.get_produces = (req, res, next) => {
  Produce.find((error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}

module.exports.get_produce = async (req, res, next) => {
  Produce.findById({
    _id: req.query.produce_id
  }, (error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}