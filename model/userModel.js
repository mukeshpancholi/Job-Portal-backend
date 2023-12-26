const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const JTW_SECRET = "mukeshpancholi@isgoodboy";
const { Schema } = mongoose;
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is require"],
    },
    lastname: {
      type: String,
    },
    email: {
      tyep: String,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "password length should be greater then 6"],
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);
//middleware

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compaire password

UserSchema.methods.comparePassword = async function (userPassword) {
  isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//jsonwebtoken
UserSchema.methods.createJWT = function () {
  return JWT.sign({ userID: this._id }, JTW_SECRET, { expiresIn: "1d" });
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
