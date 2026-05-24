const express = require("express");
const router = express.Router();

const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/loginController");
const { getUsers } = require("../controllers/userController");


// 👉 Route mapping
router.post("/register", registerUser);
router.post("/login", loginUser); 
router.get("/", getUsers);

module.exports = router;