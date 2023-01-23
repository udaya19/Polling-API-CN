const router = require("express").Router();

const {
  addQuestion,
  addOptionsToQuestion,
  castVote,
  addLinkToOptions,
} = require("../controllers/poll");

router.post("/create", addQuestion);
router.post("/:id/options/create", addOptionsToQuestion);
router.post("/:questionId/options/:optionId/add-vote", castVote);
router.get("/add-link", addLinkToOptions);

module.exports = router;
