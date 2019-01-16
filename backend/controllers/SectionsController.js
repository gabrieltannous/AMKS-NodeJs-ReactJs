// Load Models
var Section = require('../models/Section');

module.exports.create_section = (req, res, next) => {
    var newSection = new Section({
        name: req.body.name,
        code: req.body.code,
        position_id: req.body.position_id
    });
    newSection.save(function (err) {
        if (err)
            return res.status(400).json({
                success: false,
                msg: "Section cannot be created"
            });
        res.status(201).json({
            success: true,
            msg: "Section has been created"
        });
    });
}

module.exports.get_sections = async (req, res, next) => {
    Section.find({
        position_id: req.query.position_id
    }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
    });
}

// module.exports.get_sections = async (req, res, next) => {
//     Section.find({
//         position_id: req.query.position_id
//     }).distinct('name', (error, data) => {
//         let sections = [];
//         await data.map(index => {
//             Section.findOne({
//                 name: index
//             }).then(result => {
//                 sections.push(result);
//             });
//         });
//         console.log(sections);
//         if (error) return res.status(400).json(error);
//         return res.status(200).json(data);
//     });
// }

module.exports.get_section = async (req, res, next) => {
    Section.findById({
        _id: req.query.section_id
    }, (error, data) => {
        if (error) return res.status(400).json(error);
        return res.status(200).json(data);
    });
}