const mongoose = require("mongoose");
const AuthModel = require("../mongodb/AuthModel.js");
const DB_Config = require("../mongodb/DB_Config");

function SigninProcess(request, res) {
  mongoose
    .connect(DB_Config.url)
    .then(() => {
      console.log("Database Connected");
      AuthModel.find({
        Email: request.body.Email,
        Password: request.body.Password,
      })
        .then((data) => {
          if (data.length == 0) {
            console.log("Data Not Found");
            res.status(200).json({ status: "Not Exist" });
            mongoose.connection.close();
          } else {
            console.log("Data Found");
            res
              .status(200)
              .json({
                status: "Success",
                AccountID: data[0].AccountID,
                Name: data[0].Name,
              });
            mongoose.connection.close();
          }
        })
        .catch((FindErr) => {
          console.log("Data Not Found");
          res.status(405).json({ status: "Not Exist" });
          mongoose.connection.close();
        });
    })
    .catch((Connectionerr) => {
      console.log(Connectionerr);
      res.status(500).send({ status: "Internal Server Error" });
    });
}
module.exports = SigninProcess;
