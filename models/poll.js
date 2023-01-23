//importing module
const mongoose = require("mongoose");

//defining poll schema
const pollSchema = new mongoose.Schema({
  title: String,
  options: [
    {
      name: String,
      numVotesCasted: {
        type: Number,
        default: 0,
      },
      link: String,
    },
  ],
});

//defining a model and exporting the module
const Poll = mongoose.model("Poll", pollSchema);
module.exports = Poll;
