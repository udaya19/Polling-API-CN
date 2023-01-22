const express = require("express");
const config = require("dotenv").config();
const db = require("./config/db");
const app = express();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
