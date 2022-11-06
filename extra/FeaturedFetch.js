const mongoose = require("mongoose");
const Featured = require("../mongodb/FeaturedModel.js");
const DB_Config = require("../mongodb/DB_Config");

function FeaturedFetch(req, res) {
  mongoose.connect(DB_Config.url).then(() => {
    console.log("Connected to MongoDB");
    Featured.find((err, data) => {
      if (err) {
        console.log(err);
        mongoose.connection.close();
      } else if (data) {
        res.status(200).json(data);
        mongoose.connection.close();
      }
    });
  });
}
module.exports = FeaturedFetch;
