// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const SpotSchema = new Schema(
  {
    level_id: String,
    name: String,
    capacity: Number,
    column: String,
    code: String
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Spot", SpotSchema);