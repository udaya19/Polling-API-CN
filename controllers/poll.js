const Poll = require("../models/poll"); //importing model
const {
  serverError,
  successResponse,
  errorResponse,
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
    return successResponse(req, res, "Poll created succeafully", null); //sending response to frontend
  } catch (error) {
    return serverError(req, res, error); //sending error message to frontend if any
  }
};

//adding options to particular question
exports.addOptionsToQuestion = async (req, res) => {
  try {
    const { name } = req.body;
    const question = await Poll.findById(req.params.id); //finding the quesiton by id
    if (!question) {
      return errorResponse(req, res, 404, "Poll not found"); //raising not found error if question is not found
    }
    const optionValue = {
      name: name,
    };
    question.options.push(optionValue); ////taking input from body and storing it in array of options
    await question.save(); //saving it to database
    return successResponse(req, res, "Options created succeafully", null); //sending response to frontend
  } catch (error) {
    return serverError(req, res, error); //sending error message to frontend if any
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
    return successResponse(req, res, null, questions); //sending response to frontend
  } catch (error) {
    return serverError(req, res, error); //sending error message to frontend if any
  }
};

//controller for casting vote
exports.castVote = async (req, res) => {
  try {
    const { optionId, questionId } = req.params; //taking option id and question id from params
    const question = await Poll.findById(questionId); //finding question
    if (!question) {
      return errorResponse(req, res, 404, "Question not found"); //raising not found error if question is not found
    }
    //logic to cast a vote
    question.options.map((option) => {
      if (option.id.toString() === optionId) {
        //traversing the option to match with the correct option
        option.numVotesCasted++; //incrementing vote count
        return successResponse(req, res, "Vote Casted", null); //sending success response
      } else {
        return errorResponse(req, res, 404, "Question not found"); //sending not found response
      }
    });
    await question.save(); //saving the vote count to database
  } catch (error) {
    return serverError(req, res, error); //sending error message to frontend if any
  }
};

//controller for getting single question
exports.getSingleQuestion = async (req, res) => {
  try {
    const question = await Poll.findById(req.params.id); //finding quesiton using id from params
    if (!question) {
      return errorResponse(req, res, 404, "Question not found"); //sending not found response
    }
    return successResponse(req, res, null, question); //sending
  } catch (error) {
    return serverError(req, res, error); //catching and sending error response to frontend if any
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Poll.findById(req.params.id);
    if (!question) {
      return errorResponse(req, res, 404, "Question not found"); //sending not found response
    }
    await question.remove(); //deleting from database
    return successResponse(req, res, "Poll deleted succesfully", null);
  } catch (error) {
    return serverError(req, res, error); //catching and sending error response to frontend if any
  }
};

//deleting option from question
exports.deleteOption = async (req, res) => {
  try {
    const { questionId, optionId } = req.params;
    const question = await Poll.findById(questionId);
    if (!question) {
      return errorResponse(req, res, 404, "Question not found"); //sending not found response
    }
    //logic for deleting options by iterating through the options array
    question.options.forEach((option, index) => {
      if (option._id.toString() === optionId.toString()) {
        return question.options.splice(index, 1); //splicing the index if condition satisfies
      }
    });
    await question.save();
    return successResponse(req, res, "Option deleted succesfully", null);
  } catch (error) {
    return serverError(req, res, error); //catching and sending error response to frontend if any
  }
};
