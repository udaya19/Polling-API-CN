const router = require("express").Router();

const {
  addQuestion,
  addOptionsToQuestion,
  castVote,
} = require("../controllers/poll");

router.post("/create", addQuestion);
router.post("/:id/options/create", addOptionsToQuestion);
router.post("/:questionId/options/:optionId/add-vote", castVote);

module.exports = router;
