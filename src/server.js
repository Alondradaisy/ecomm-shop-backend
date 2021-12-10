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

//user session middleware
app.use((req, res, next) => {
  const sessionToken = req.cookies.session_token;

  if (sessionToken) {
    try {
      const { userId: iat } = jwt.verify(
        session.Token,
        process.env.PRIVATE_SESSION_KEY
      );
      console.log(iat);
      req.userId = userId;
    } catch (error) {
      console.log("error: ", error);
    }
  }
  next();
});

app.use("/", router);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Preview app live at http://localhost:${port}`);
});
