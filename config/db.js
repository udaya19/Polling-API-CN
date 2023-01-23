const mongoose = require("mongoose");
//connecting to database
mongoose.connect("mongodb://localhost/cn-polling");
const db = mongoose.connection;
//checking if connection is established
db.on("error", console.error.bind(console, "Error in connecting database"));
db.once("open", () => console.log("Connected to database"));
//exporting the module
module.exports = db;
