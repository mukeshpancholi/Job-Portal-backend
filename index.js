const connectToMongodb = require("./config/db");
const authRout = require("./routes/authRoutes.js");
const errorMiddleware = require("./middleware/errorMiddleware.js");

const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());

connectToMongodb();

app.use("/api/v1/auth", authRout);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
