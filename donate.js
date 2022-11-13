const express = require("express");
const app = express();
const port = 4009;
const routing = require("./router");
const PostRouter = require("./PostRequestHandler");
const QueryRouter = require("./QueryHandler");
const helmet = require("helmet");
const CORS = require("cors");
// configure the app to use bodyParser()
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000,
    limit: 1024 * 1024 * 10,
  })
);
app.use(
  bodyParser.json({
    limit: "900mb",
    extended: true,
    parameterLimit: 10000000,
  })
);
// using helmet to secure Express headers
app.use(helmet({contentSecurityPolicy: false}));
// using CORS to allow cross-origin requests
var domains = ['https://donate.theankan.live', 'http://127.0.0.1:4000/'];
app.use(CORS(domains));
// link static files
app.use(express.static("src"));
// link the router
app.use(routing);
app.use(PostRouter);
app.use(QueryRouter);
// pug configuration
app.set("views", "./src/html/Donation");
app.set("view engine", "pug");
//listen to port
app.listen(port, () => console.log(`app listening on port ${port}!`));
