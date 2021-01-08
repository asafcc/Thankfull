const express = require("express");
const router = express.Router();

const { saveQuote, getQuotes } = require("../controllers/quoteController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(getQuotes);
router.route("/").post(protect, saveQuote);

module.exports = router;
