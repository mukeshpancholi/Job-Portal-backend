const userModel = require("../model/userModel.js");
const authcontroller = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Please provide name",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Please provide email",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Please provide password",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already registered please login",
      });
    }
    const user = await userModel.create({ name, email, password });
    //token
    const token = user.createJWT();
    res.status(201).send({
      success: true,
      message: "User Created successfully..",
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        location: user.location,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = authcontroller;

const loginauthcontroller = async (req, res, Next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    next("Please provide all filed");
  }
  //find user by email
  const user = await userModel.findOne({ email });
  if (!user) {
    Next("Invalid user name and password");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    Next("Access invalide");
  }
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login successfully",
    user,
    token,
  });
};

module.exports = loginauthcontroller;
