const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let dotenv = require("dotenv").config({ path: ".env" });
const config = dotenv.parsed;
let TOKEN_SECRET = config.TOKEN_SECRET || "secret";
module.exports.register = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  !(email && password && fname && lname) &&
    res.status(400).send("All input is required");
  const oldUser = await userModel.findOne({ email });
  if (oldUser) return res.status(409).send("User Already Exist. Please Login");
  encryptedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    fname,
    lname,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });
  const token = jwt.sign({ user_id: user._id, email }, TOKEN_SECRET, {
    expiresIn: "2h",
  });
  res.cookie("token", token);
  res.status(201).json(user);
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  !(email && password) && res.status(400).send("All input is required");
  const user = await userModel.findOne({ email: email.toLowerCase() });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ user_id: user._id, email }, TOKEN_SECRET, {
      expiresIn: "2h",
    });
    res.cookie("token", token);
    res.status(200).json(user);
  } else next(err);
};

module.exports.home = (req, res) => {
  res.send("welcome Home Page");
};

module.exports.logout = (req, res) => {
  res.cookie("token", "Not valid");
  res.send("loged out ");
};
