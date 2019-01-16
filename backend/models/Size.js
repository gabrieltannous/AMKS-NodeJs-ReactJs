// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const SizeSchema = new Schema(
  {
    id: Number,
    name: String,
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Sizes", SizeSchema);