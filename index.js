const connectToMongodb = require("./config/db");
const authrout = require("./routes/auth");
const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
connectToMongodb();
app.use("/api/auth", authrout);
app.use("/api/auth", authrout);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
