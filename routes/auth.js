const express = require("express");
const router = express.Router();

const { validationResult, body } = require("express-validator");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const JTW_SECRET = "mukeshpancholi@isgoodboy";
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

// Routes -> 1 : create a User using POST "/api/auth/createuser, no login required "
router.post(
  "/createuser",
  [
    body("name", "Enter a name").isLength({ min: 3 }),
    body("email", "Enter valied email").isEmail(),
    body("password", "Password must be 5 char").isLength({ min: 5 }),
  ],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return resp
          .status(400)
          .json({ error: "Sorry a user with this email already exist.." });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JTW_SECRET);
      // resp.send(user);
      return resp.json(authtoken);
    } catch (error) {
      console.error(error.message);
      resp.status(500).send("Some error occurd");
    }
  }
);

router.post(
  "/login",
  [
    body("email", "Enter valied email").isEmail(),
    body("password", "Password should not be blank").isLength({ min: 5 }),
  ],
  async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return resp.status(400).json({
        error: "please enter correct user name",
      });
    }

    const passwordCompare = bcrypt.compare(password, user.password);
    console.log(passwordCompare);
    if (!passwordCompare) {
      return resp.status(400).json({
        error: "Please enter correct password",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JTW_SECRET);
    console.log(authtoken);

    return resp.json({ token: authtoken });
    // resp.send(req.body);
  }
);

module.exports = router;
