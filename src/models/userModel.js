const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userModel = new mongoose.Schema(
  {
    access_token: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model("User", userModel);

User.findOne({
  email: "user@gmail.com",
}).then((res) => {
  if (!res) {
    User.create({
      email: "user@gmail.com",
      password: "25d55ad283aa400af464c76d713c07ad", //12345678
      name: "user",
      access_token: jwt.sign(
        {
          email: "user@gmail.com",
        },
        "supersecret"
      ),
    });
  }
});

module.exports = User;
