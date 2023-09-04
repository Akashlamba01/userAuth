const express = require("express");
require("dotenv").config();
require("./src/config/connection");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", require("./src/routes"));

app.listen(3001, () => {
  console.log("Server is runnig on Port: 3001");
});
