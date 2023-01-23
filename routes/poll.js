//importing module
const router = require("express").Router();

//importing controllers
const {
  addQuestion,
  addOptionsToQuestion,
  castVote,
  addLinkToOptions,
} = require("../controllers/poll");

//routes
router.post("/create", addQuestion); //adding a quesiton
router.post("/:id/options/create", addOptionsToQuestion); //adding options to a question
router.post("/:questionId/options/:optionId/add-vote", castVote); //casting a vote
router.get("/add-link", addLinkToOptions); //adding links to vote

module.exports = router;
