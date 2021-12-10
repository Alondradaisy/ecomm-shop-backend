const mongoose = require("mongoose");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const UserController = require("../controller/UserController.js");

const uuidv4 = uuid.v4;

const registerUser = async (req, res) => {
  const { name, lastName, password, email } = req.body;

  const newUser = new userModel({
    id: uuidv4(),
    name,
    lastName,
    password,
    email,
  });

  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("Unable to register user");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await UserController.UserModel.findOne({ email, password });
  console.log("user login: ", userFound);

  const token = jwt.sign(
    { userId: userFound.id, iat: Date.now() },
    process.env.PRIVATE_SESSION_KEY
  );

  res
    .cookie("session token", token, {
      httpOnly: true,
      secure: false,
    })
    .send(userFound);
};

const logout = async (req, res) =>
  res.clearCookie("session_token").send("Logged out successfully");

const UserService = {
  registerUser,
  login,
  logout,
};

module.exports = UserService;
