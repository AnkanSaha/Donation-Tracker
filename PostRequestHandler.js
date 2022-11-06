const express = require("express");
const DonateHistory = require("./mongodb/DonateHistory.js");
const route = express.Router();

// managing the post request
route.post("/CreateUser", (req, res) => {
  var Signup = require("./Auth/Signup.js");
  Signup(req, res);
});

route.post("/LoginUser", (req, res) => {
  var Signin = require("./Auth/signin.js");
  Signin(req, res);
});

// for handling Donate History
route.post("/RegisterDonateHistory", (req, res) => {
  var DonateHistory = require("./extra/DonateHistory.js");
  DonateHistory.History(req.body, res);
});

route.post("/gethistory", (req, res) => {
  var DonateHistory = require("./extra/DonateHistory.js");
  DonateHistory.OldHistory(req.body.AccountID, res);
});
module.exports = route;
