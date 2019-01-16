// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const LevelSchema = new Schema(
  {
    section_id: String,
    name: String,
    code: String
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Level", LevelSchema);