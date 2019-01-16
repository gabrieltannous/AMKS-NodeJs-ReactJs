// Load Models
var Color = require('../models/Color');
var Stock = require('../models/Stock');

module.exports.create_color = (req, res, next) => {
  var newColor = new Color({
    name: req.body.name,
  });
  newColor.save(function (err) {
    if (err)
      return res.status(400).json({
        success: false,
        msg: "Color cannot be created"
      });
    res.status(201).json({
      success: true,
      msg: "Color has been created"
    });
  });
}

module.exports.choose_color = (req, res, next) => {
  Color.findById({
    _id: req.body.color_id
  }, (error, data) => {
    if (error)
      return res.status(400).json({
        success: false,
        msg: "Color cannot be found"
      });
    Stock.findByIdAndUpdate({
      _id: req.body.stock_id
    }, {$set: {color_id: data._id}}, (error) => {
      if (error)
      return res.status(400).json({
        success: false,
        msg: "Stock cannot be updated"
      });
    })
  })
}

module.exports.get_colors = (req, res, next) => {
  Color.find((error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}

module.exports.get_color = async (req, res, next) => {
  Color.findById({
    _id: req.query.color_id
  }, (error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}