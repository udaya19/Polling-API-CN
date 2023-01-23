//importing libraries
const express = require("express");
const config = require("dotenv").config();

const db = require("./config/db"); //connecting to database
const { port } = require("./config/port"); //port number

const app = express();
app.use(express.json()); //sending requests in the form of json

app.use("/questions", require("./routes/poll")); //registering main route

app.listen(port, () => {
  //registering the server on port
  console.log(`Server running on port ${port}`);
});
