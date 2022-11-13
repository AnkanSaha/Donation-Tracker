const mongoose = require("mongoose");
const AuthModel = require("../mongodb/AuthModel.js");
const DB_Config = require("../mongodb/DB_Config");

function SignUpProcess(request, res) {
  var { v4: uuidv4 } = require("uuid");
  const AccountID = uuidv4();
  mongoose
    .connect(DB_Config.url)
    .then(() => {
      console.log("Database Connected");
      var SignUp = new AuthModel({
        Name: request.body.name,
        Email: request.body.Email,
        Password: request.body.Password,
        ConfirmPassword: request.body.ConfirmPassword,
        AccountID: AccountID,
      });
      AuthModel.find({ Email: request.body.Email })
        .then((data) => {
          if (data.length == 0) {
            SignUp.save()
              .then(() => {
                console.log("Data Saved");
                res
                  .status(200)
                  .json({
                    status: "Success",
                    AccountID: AccountID,
                    Name: request.body.name,
                  });
                mongoose.connection.close();
              })
              .catch((err) => {
                console.log("Data Not Saved");
                res.status(400).json({ status: "Failed" });
                mongoose.connection.close();
              });
          } else {
            console.log("Data Not Saved");
            res.status(405).json({ status: "Exist" });
            mongoose.connection.close();
          }
        })
        .catch((FindErr) => {
          console.log("Data Not Saved");
          res.status(405).json({ status: "Failed" });
          mongoose.connection.close();
        });
    })
    .catch((Connectionerr) => {
      console.log(Connectionerr);
      res.status(500).send({ status: "Internal Server Error" });
    });
}
module.exports = SignUpProcess;

// res.status(200).json({status:'Success', AccountID:AccountID, Name : request.body.name});
