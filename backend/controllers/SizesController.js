// Load Models
var Size = require('../models/Size');
var Stock = require('../models/Stock');

module.exports.create_size = (req, res, next) => {
  var newSize = new Size({
    name: req.body.name,
  });
  newSize.save(function (err) {
    if (err)
      return res.status(400).json({
        success: false,
        msg: "Size cannot be created"
      });
    res.status(201).json({
      success: true,
      msg: "Size has been created"
    });
  });
}

module.exports.choose_size = (req, res, next) => {
  Size.findById({
    _id: req.body.size_id
  }, (error, data) => {
    if (error)
      return res.status(400).json({
        success: false,
        msg: "Size cannot be found"
      });
    Stock.findByIdAndUpdate({
      _id: req.body.stock_id
    }, {$set: {size_id: data._id}}, (error) => {
      if (error)
      return res.status(400).json({
        success: false,
        msg: "Stock cannot be updated"
      });
    })
  })
}

module.exports.get_sizes = (req, res, next) => {
    Size.find((error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}

module.exports.get_size = async (req, res, next) => {
  Size.findById({
    _id: req.query.size_id
  }, (error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}