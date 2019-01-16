// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const PalletSchema = new Schema(
  {
    spot_id: String,
    pallet_number: String,
    date: String,
    code: String,
    stocks: [Object]
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Pallet", PalletSchema);