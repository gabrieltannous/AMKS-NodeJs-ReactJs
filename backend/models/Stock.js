// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const StockSchema = new Schema(
  {
    pallet_id: String,
    produce_id: String,
    color_id: String,
    size_id: String,
    grower_id: String,
    grade_id: String,
    quantity: Number,
    code: String
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Stock", StockSchema);