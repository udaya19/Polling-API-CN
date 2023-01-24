const Poll = require("../models/poll"); //importing model
const {
  successMessage,
  internalError,
  notFound,
} = require("../config/responses"); //importing api responses

//importing value of port
const { port } = require("../config/port");

//controller for adding a question
exports.addQuestion = async (req, res) => {
  try {
    const { title } = req.body; //taking input from body
    const newPoll = new Poll({
      title,
    }); //creating a new question
    await newPoll.save(); //saving to database
    return res
      .status(200)
      .json(successMessage("Poll created succesfully", null, true)); //sending response to frontend
  } catch (error) {
    return res.status(500).json(internalError(error.message, false)); //printing if there is any error
  }
};

//adding options to particular question
exports.addOptionsToQuestion = async (req, res) => {
  try {
    const { name } = req.body;
    const question = await Poll.findById(req.params.id); //finding the quesiton by id
    if (!question) {
      notFound("Poll not found", false); //sending error response if question not found
    }
    const optionValue = {
      name: name,
    };
    question.options.push(optionValue); ////taking input from body and storing it in array of options
    await question.save(); //saving it to database
    return res
      .status(200)
      .json(successMessage("Options created succesfully", true)); //sending response to frontend
  } catch (error) {
    return res.status(500).json(internalError(error.message, false)); //sending error message to frontend if any
  }
};

//adding link to cast vote to respective options
exports.addLinkToOptions = async (req, res) => {
  try {
    const questions = await Poll.find(); //fetching all questions
    questions.map(async (question) => {
      question.options.map((option) => {
        const link = `http://localhost:${port}/questions/${question._id}/options/${option.id}/add-vote`;
        option.link = link; //searching the option and adding the link
      });
      await question.save(); //saving the question
    });
    return res.status(200).json(successMessage(null, questions, true)); //sending response to frontend
  } catch (error) {
    return res.status(500).json(internalError(error.message, false)); //sending error message to frontend if any
  }
};

//controller for casting vote
exports.castVote = async (req, res) => {
  try {
    const { optionId, questionId } = req.params; //taking option id and question id from params
    const question = await Poll.findById(questionId); //finding question
    if (!question) {
      return res.status(404).json(notFound("Poll not found", false)); //raising not found error if question is not found
    }
    //logic to cast a vote
    question.options.map((option) => {
      if (option.id.toString() === optionId) {
        //traversing the option to match with the correct option
        option.numVotesCasted++; //incrementing vote count
        return res.json(successMessage("Vote casted succesfully", null, false));
      } else {
        return res.status(404).json(notFound("Option not found", false));
      }
    });
    await question.save(); //saving the vote count to database
  } catch (error) {
    return res.status(500).json(internalError(error.message, false)); //sending error message to frontend if any
  }
};

//controller for getting single question
exports.getSingleQuestion = async (req, res) => {
  try {
    const question = await Poll.findById(req.params.id); //finding quesiton using id from params
    if (!question) {
      return res.status(404).json(notFound("Poll not found", false)); //raising not found error if question is not found
    }
    return res.status(200).json(successMessage(null, question, true)); //sending success response to frontend
  } catch (error) {
    return res.status(500).json(internalError(error.message, false)); //sending error message to frontend if any
  }
};
