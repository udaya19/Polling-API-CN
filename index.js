const express = require("express");
const config = require("dotenv").config();

const db = require("./config/db");
const { port } = require("./config/port");
const app = express();

app.use(express.json());

app.use("/questions", require("./routes/poll"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
