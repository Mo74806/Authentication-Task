const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
var cookieParser = require("cookie-parser");

let dotenv = require("dotenv").config({ path: ".env" });
const config = dotenv.parsed;
let API_PORT = config.API_PORT || 8080;
let DB_URI = config.DB_URI || "mongodb://localhost:27017/userDB";
//pasring middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//DB connection
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//routes handle
app.use("/", userRouter);
//error route handler
app.use((err, req, res, next) => {
  res.send("please check your data");
});
app.listen(API_PORT, (req, res) => {
  console.log(`server running on port ${API_PORT}`);
});
