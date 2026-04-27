const bcrypt = require("bcrypt");
const pool = require("../config/db");

// 👉 Register function
const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const existingUser = await pool.query(
      "SELECT * FROM userMaster WHERE username=$1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO userMaster (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );

    res.json({ message: "User registered ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error"+err });
  }
};

module.exports = { registerUser };