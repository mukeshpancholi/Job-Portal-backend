const mongoose = require("mongoose");
const colors = require("colors");
const conn = mongoose.connect("mongodb://127.0.0.1:27017/job-portal");

const connectToMongodb = () => {
  try {
    if (conn) {
      console.log(`Database connected successfully...`.bgGreen.green);
    } else {
      console.log("getting error..");
    }
  } catch (error) {
    console.log("connection error", error);
  }
};

module.exports = connectToMongodb;
