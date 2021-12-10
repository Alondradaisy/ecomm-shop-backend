const express = require("express");
let cors = require("cors");
const router = require("./router");
const dotenv = require("dotenv");
let cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const port = 3020;

//connect to DB with mongoose and copied mongodb link + store in .env
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MONGO_DB_CONNECTED SUCCESSFULLY"))
  .catch((error) => console.log(error));

app.use(cors({ credentials: true, origin: "http://localhost:3020" }));
app.use(cookieParser());

const logger = require("morgan");
//const bodyParser = require("body-parser");
//middleware that comes from morgan
app.use(logger("dev"));

app.use(express.json());

app.use("/", router);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Preview app live at http://localhost:${port}`);
});
