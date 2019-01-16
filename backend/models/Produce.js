// /backend/data.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const ProduceSchema = new Schema(
  {
    name: String,
    nick_name: String,
    colors: String,
    sizes: String
  }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Produces", ProduceSchema);