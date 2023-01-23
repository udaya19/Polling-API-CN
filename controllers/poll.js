const Poll = require("../models/poll");
const {
  successMessage,
  internalError,
  notFound,
} = require("../config/responses");

const port = process.env.PORT;

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

exports.addOptionsToQuestion = async (req, res) => {
  try {
    const { name } = req.body;
    const question = await Poll.findById(req.params.id);
    if (!question) {
      notFound("Poll not found", false);
    }
    const optionValue = {
      name: name,
    };
    question.options.push(optionValue);
    await question.save();
    return res
      .status(200)
      .json(successMessage("Options created succesfully", link, true));
  } catch (error) {
    return res.status(500).json(internalError(error.message, false));
  }
};

exports.addLinkToOptions = async (req, res) => {
  try {
    const questions = await Poll.find();
    questions.map(async (question) => {
      question.options.map((option) => {
        const link = `http://localhost:${port}/questions/${question._id}/options/${option.id}/add-vote`;
        option.link = link;
      });
      await question.save();
    });
    return res.status(200).json(successMessage(null, questions, true));
  } catch (error) {
    return res.status(500).json(internalError(error.message, false));
  }
};

exports.castVote = async (req, res) => {
  try {
    const { optionId, questionId } = req.params;
    const question = await Poll.findById(questionId);
    if (!question) {
      notFound("Poll not found", false);
    }
    question.options.map((option) => {
      if (option.id.toString() === optionId) {
        option.numVotesCasted++;
        return res.json(successMessage("Vote casted succesfully", null, false));
      } else {
        return res.status(404).json(notFound("Option not found", false));
      }
    });
    await question.save();
  } catch (error) {
    return res.status(500).json(internalError(error.message, false));
  }
};
