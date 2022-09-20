const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fname: { type: String, required: [true, "name is required"] },
  lname: { type: String, required: [true, "name is required"] },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: { type: String, required: [true, "password is required"] },
});

module.exports = mongoose.model("user", userSchema);
