const express = require("express");
let cors = require("cors");
const router = require("./router");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
let cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = 3020;

const logger = require("morgan");
const bodyParser = require("body-parser");

//connect to DB with mongoose and copied mongodb link + store in .env
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log("MONGO_DB_CONNECTED SUCCESSFULLY"))
  .then((error) => console.log(error));

app.use(cors({ credentials: true, origin: "http://localhost:3020" }));
app.use(cookieParser());

//middleware that comes from morgan
app.use(logger("dev"));

app.use(express.json());

app.use("/", router);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Preview app live at http://localhost:${port}`);
});
