const mongoose = require("mongoose"); // import mongoose

let Featured = {
  ids: { type: String, required: true },
  userName: { type: String, required: true },
  profession: { type: String, required: true },
  slug: { type: String, required: true },
  profileUrl: { type: String, required: true },
};
let FeaturedSchema = new mongoose.Schema(Featured);
module.exports = mongoose.model("Featured", FeaturedSchema);
