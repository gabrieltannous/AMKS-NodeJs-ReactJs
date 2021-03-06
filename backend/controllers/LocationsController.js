// Load Models
var Location = require('../models/Location');
var Position = require('../models/Position');

const {
  validationResult
} = require('express-validator/check');

module.exports.create_location = (req, res, next) => {
  var newLocation = new Location({
    name: req.body.name,
    code: req.body.code
  });
  newLocation.save(function (err) {
    if (err)
      return res.status(400).json({
        success: false,
        msg: "Location cannot be created"
      });
    res.status(201).json({
      success: true,
      msg: "Location has been created"
    });
  });
}

module.exports.get_locations = async (req, res, next) => {
  Location.find((error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}

module.exports.get_location = async (req, res, next) => {
  Location.findById({
    _id: req.query.location_id
  }, (error, data) => {
    if (error) return res.status(400).json(error);
    return res.status(200).json(data);
  });
}

module.exports.get_location_by_position = async (req, res, next) => {
  Position.findById({
    _id: req.query.position_id
  }, (error, data) => {
    if (error) return res.status(400).json(error);
    Location.findById({
      _id: data.location_id
    }), (error, data) => {
      if (error) return res.status(400).json(error);
      return res.status(200).json(data);
    }
  });
}

// Current company set interview for applicant
/*module.exports.set_interview = (req, res, next) => {
  var newInter = new Interview({
    companyId: req.company._id,
    userId: req.body.userId,
    jobId: req.body.jobId,
    date: req.body.date,
    decision: "not yet"
  });
  //find all applicants
  newInter.save(function (err) {
    if (err)
      return res.status(400).json({
        success: false,
        msg: "Interview cannot be set"
      });
    res.status(201).json({
      success: true,
      msg: "Interview set successfully"
    });
  });
}

module.exports.get_company_interviews = (req, res, next) => {
  Interview.find({
    companyId: req.company._id
  }, function (err, records) {
    if (err) throw err;

    if (!records)
      return res.status(400).json({
        success: false
      });

    var user_ids = records.map(value => value.userId);
    var interviews = JSON.parse(JSON.stringify(records));

    User.find()
      .where('_id')
      .in(user_ids)
      .exec(function (err, records) {
        if (err) throw err;

        for (var i = 0; i < interviews.length; i++) {
          for (var j = 0; j < records.length; j++) {
            if (interviews[i].userId == records[j]._id) {
              interviews[i]["user"] = JSON.parse(JSON.stringify(records[j]));
              break;
            }
          }
        }
        res.status(200).json({
          success: true,
          interviews: interviews
        });
      });

  });
}

module.exports.update_user_interview = (req, res) => {

  Interview.findByIdAndUpdate(req.body._id, {
      $set: req.body
    },
    function (err, result) {
      if (err) throw err;
      if (!result) {
        res.status(400).json({
          success: false,
          msg: 'Problem occurs. Data cannot be saved'
        });
      } else {
        res.status(201).json({
          success: true,
          msg: "Interview decision updated successfully"
        });
      }
    });
}

module.exports.get_user_interviews = (req, res, next) => {

  Interview.find({
    userId: req.user._id
  }, function (err, records) {
    if (err) throw err;

    if (!records)
      return res.status(400).json({
        success: false
      });

    var com_ids = records.map(value => value.companyId);
    var interviews = JSON.parse(JSON.stringify(records));

    Company.find()
      .where('_id')
      .in(com_ids)
      .exec(function (err, records) {
        if (err) throw err;

        for (var i = 0; i < interviews.length; i++) {
          for (var j = 0; j < records.length; j++) {
            if (interviews[i].companyId == records[j]._id) {
              interviews[i]["company"] = JSON.parse(JSON.stringify(records[j]));
              break;
            }
          }
        }
        res.status(200).json({
          success: true,
          interviews: interviews
        });
      });

  });
}
*/