const mongoose = require("mongoose");

let DonateHistorySchema = {
  CreatorName: { type: String, required: true },
  profession: { type: String, required: true },
  CreatorProfileURL: { type: String, required: true },
  CreatorSlug: { type: String, required: true },
  SenderName: { type: String, required: true },
  SenderAccountID: { type: String, required: true },
  Amount: { type: String, required: true },
  Date: { type: String, required: true },
  Message: { type: String, required: true },
  Status: { type: String, required: true },
};
let DonateScheema = new mongoose.Schema(DonateHistorySchema);
module.exports = mongoose.model("DonateHistory", DonateScheema);
