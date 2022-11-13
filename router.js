const express = require("express"); // import express
const route = express.Router(); // create a router
const currentDir = __dirname; // get current directory

route.get("/", (req, res) => {
  res.status(200).sendFile(`${currentDir}/src/html/home/home.html`);
});

// sending signup page
route.get("/signup", (req, res) => {
  res.status(200).sendFile(`${currentDir}/src/html/Auth/signup.html`);
});

// sending login page
route.get("/signin", (req, res) => {
  res.status(200).sendFile(`${currentDir}/src/html/Auth/login.html`);
});

route.get("/history", (req, res) => {
  res.status(200).sendFile(`${currentDir}/src/html/history/history.html`);
});
module.exports = route; // export the router
