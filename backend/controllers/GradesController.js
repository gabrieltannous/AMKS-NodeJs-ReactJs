// Load Models
var Grade = require('../models/Grade');
var Stock = require('../models/Stock');

module.exports.create_grade = (req, res, next) => {
  var newGrade = new Grade({
    name: req.body.name,
  });
  newGrade.save(function (err) {
    if (err)
      return res.status(400).json({
        success: false,
        msg: "Grade cannot be created"
      });
    res.status(201).json({
      success: true,
      msg: "Grade has been created"
    });
  });
}

module.exports.choose_grade = (req, res, next) => {
  Grade.findById({
    _id: req.body.grade_id
  }, (error, data) => {
    if (error)
      return res.status(400).json({
        success: false,
        msg: "Grade cannot be found"
      });
    Stock.findByIdAndUpdate({
      _id: req.body.stock_id
    }, {$set: {grade_id: data._id}}, (error) => {
      if (error)
      return res.status(400).json({
        success: false,
        msg: "Stock cannot be updated"
      });
    })
  })
}

module.exports.get_grades = (req, res, next) => {
    Grade.find((error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}

module.exports.get_grade = async (req, res, next) => {
  Grade.findById({
    _id: req.query.grade_id
  }, (error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}