const mongoose = require("mongoose");
const Featured = require("../mongodb/FeaturedModel.js");
const DB_Config = require("../mongodb/DB_Config");

function QueryFetch(req, res, query) {
  mongoose.connect(DB_Config.url).then(() => {
    console.log("Connected to MongoDB");
    Featured.find({ ids: query }, (err, data) => {
      if (err) {
        console.log(err);
        mongoose.connection.close();
      } else if (data) {
        console.log(data);
        res
          .status(200)
          .render("preview", {
            profileUrls: data[0].profileUrl,
            creatorName: data[0].userName,
          });
        mongoose.connection.close();
      }
    });
  });
}
module.exports = QueryFetch;
