const mongoose = require("mongoose");

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

const Poll = mongoose.model("Poll", pollSchema);
module.exports = Poll;
