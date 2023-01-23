const router = require("express").Router();

const { addQuestion } = require("../controllers/poll");

router.post("/create", addQuestion);

module.exports = router;
