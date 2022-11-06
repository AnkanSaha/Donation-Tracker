const mongoose = require("mongoose");
const DonateModel = require("../mongodb/DonateHistory.js");
const CreatorData = require("../mongodb/FeaturedModel.js");
const DB = require("../mongodb/DB_Config.js");

function DonateHistory(Userdata, res) {
  console.log(Userdata);
  mongoose
    .connect(DB.url)
    .then(() => {
      console.log("Database Connected");
      CreatorData.find({ userName: Userdata.CreatorName }, (err, data) => {
        if (err) {
          console.log("Not Found Any Creator");
          res.status(200).json({ Status: "Internal Server Error" });
          mongoose.connection.close();
        } else if (data) {
          console.log(data);
          var MainData = new DonateModel({
            CreatorName: data[0].userName,
            profession: data[0].profession,
            CreatorProfileURL: data[0].profileUrl,
            CreatorSlug: data[0].slug,
            SenderName: Userdata.SenderName,
            SenderAccountID: Userdata.AccountID,
            Amount: Userdata.Amount,
            Date: Userdata.PaymentDate,
            Message: Userdata.message,
            Status: "Success",
          });
          MainData.save()
            .then(() => {
              console.log("Record Saved To Database");
              res
                .status(200)
                .json({
                  Status: `Thank You For Donationg ${data[0].userName}`,
                });
              mongoose.connection.close();
            })
            .then((SaveErr) => {
              console.log(SaveErr);
              mongoose.connection.close();
            });
        }
      });
    })
    .catch((ConnectionErr) => {
      console.log(ConnectionErr);
    });
}

function OldHistory(AccountID, res) {
  console.log(AccountID);
  mongoose
    .connect(DB.url)
    .then(() => {
      console.log("Database Connected");
      DonateModel.find({ SenderAccountID: AccountID }, (FindErr, result) => {
        if (FindErr) {
          console.log("Unable To Find");
          res
            .status(405)
            .json({ Status: "Unable To Process at this time ..." });
          mongoose.connection.close();
        } else if (result) {
          console.log("data found");
          res.status(200).json(result);
        }
      });
    })
    .catch((ConnectionErr) => {
      console.log(ConnectionErr);
    });
}

module.exports.History = DonateHistory;
module.exports.OldHistory = OldHistory;
