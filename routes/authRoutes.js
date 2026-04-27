const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authController");

// 👉 Route mapping
router.post("/register", registerUser);

module.exports = router;