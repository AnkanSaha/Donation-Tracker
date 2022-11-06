const express = require("express");
const query = express.Router();
const FeaturedFetch = require("./extra/FeaturedFetch.js");
const PreviewFetch = require("./extra/preview.js");

query.get("/getpost", (req, res) => {
  FeaturedFetch(req, res);
});

query.get("/home/:Query", (req, res) => {
  let query = req.params.Query;
  PreviewFetch(req, res, query);
});
module.exports = query;
