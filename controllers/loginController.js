const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const SECRET = "mysecretkey"; // later move to env

// 👉 LOGIN FUNCTION
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 🔴 Validation
    if (!username || !password) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    // 🔍 Find user
    const result = await pool.query(
      "SELECT * FROM userMaster WHERE username=$1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // 🔐 Compare password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // 🎟️ Generate token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful ✅",
      token,
      userId: user.id,
      username: user.username
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error"+err });
  }
};

module.exports = {loginUser};