const express = require("express");
let cors = require("cors");
const router = require("./router");
const mongoose = require("mongoose");
require("dotenv").config();

const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = 3020;

mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("MONGO_DB_CONNECTED SUCCESSFULLY"))
  .then((error) => console.log(error));

app.use(cors());
app.use(logger("dev"));

app.use(express.json());

app.use("/", router);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Preview app live at http://localhost:${port}`);
});
