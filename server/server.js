const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./config/config.js");

//next.js configuration
const dev = process.env.NODE_DEV !== "production";

// database configuration
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose
  .connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.use(cors());

// Require Posts routes
require("./app/routes/post.routes.js")(app);

//catch-all for nextJS /pages
app.get("*", (req, res) => {
  return handle(req, res);
});

// listen for requests
app.listen(config.serverPort, (err) => {
  if (err) throw err;
  console.log("listening on port " + config.serverPort);
});
