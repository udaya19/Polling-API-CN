const { successMessage, internalError } = require("../config/responses");
const Poll = require("../models/poll");

exports.addQuestion = async (req, res) => {
  try {
    const { title } = req.body;
    const newPoll = new Poll({
      title,
    });
    await newPoll.save();
    return res
      .status(200)
      .json(successMessage("Poll created succesfully", null, true));
  } catch (error) {
    return res.status(500).json(internalError(error.message, false));
  }
};
