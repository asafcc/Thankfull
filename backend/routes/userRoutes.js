const express = require("express");
const router = express.Router();
const {
  login,
  registerUser,
  authUser,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/auth", protect, authUser);
router.post("/register", registerUser);

module.exports = router;
