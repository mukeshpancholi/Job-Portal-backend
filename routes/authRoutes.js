const express = require("express");
const authcontroller = require("../controller/authcontroller.js");
const loginauthcontroller = require("../controller/authcontroller.js");

//object router
const router = express.Router();

//create router
//Register ||post
router.post("/register", authcontroller);

//login ||post
router.post("/login", loginauthcontroller);

//export router

module.exports = router;
